import React from 'react';
import Select from 'react-select';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import ListGroup from "react-bootstrap/ListGroup";


import {PostForm} from './Forms';

const forumStyle = {
  maxHeight: '500px',
  overflowY: 'auto',
  borderLeft: '1px solid #e1e1e1',
  borderRight: '1px solid #e1e1e1',
  borderBottom: '1px solid #e1e1e1',
  padding: '8px'
}

export class Forum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "All",
    };
  }

  buildTabJSX(){
    if (!this.props.forumPosts){
      return null;
    }

    const tags = Array.from(new Set(this.props.forumPosts.map(post => post.tag)));
    console.log(tags[0]);
    //this.setState({key: tags[0]});

    return tags.map(tag =>
      <Tab eventKey={tag} title={tag}>
        <ListGroup style={forumStyle}>
          {this.buildForumJSX(tag)}
        </ListGroup>
      </Tab>
      );
  }

  buildForumJSX(tag = null){
    if (!this.props.forumPosts){
      return null;
    }

    const forumPostsDisplay = [];
    for (let i = 0; i < this.props.forumPosts.length; i++){
      if (tag && this.props.forumPosts[i].tag !== tag){
        continue;
      }

      forumPostsDisplay.push(
        <div>
          <ListGroup.Item key={i} style={{width: 'auto', backgroundColor: '#f9f9f9', marginBottom: '8px'}}>
            <h5 style={{fontFamily: "Verdana"}}><b>{this.props.forumPosts[i].subject}</b></h5>
            <hr/>
            <p>{this.props.forumPosts[i].message}</p>
            <Row>
              <Col md={4} style={{color: 'grey'}}><b>{this.props.forumPosts[i].tag}</b></Col>
              <Col md={8} style={{textAlign: 'right', color: '#4287f5'}}><i><u>{this.props.forumPosts[i].email}</u></i></Col>
            </Row>
          </ListGroup.Item>
        </div>
      );
    }
    return forumPostsDisplay;
  }

  render() {
    return (
      <div>
        
        <Tabs
          id="controlled-tab-example"
          onSelect={(k) => this.setState({key: k})}
          activeKey={this.state.key}
        >
          <Tab eventKey="All" title="All">
            <ListGroup style={forumStyle}>
              {this.buildForumJSX()}
            </ListGroup>
          </Tab>

          {this.buildTabJSX()}
        </Tabs>


      </div>
    );
  }
}

//PROPS: profileInfo
export class ForumComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      forumPosts: null,
    };
    this.handleClose = this.handleClose.bind(this);
    this.getForumPosts = this.getForumPosts.bind(this);
  }

  handleShow = () => this.setState({show: true});
  handleClose = () => this.setState({show: false});

  componentDidMount(){
    this.getForumPosts();
  }

  async getForumPosts(event) {
    const radius = event ? event.value : "0";

    try {
      const res = await fetch("http://localhost:9000/forum/zipcode/" + this.props.profileInfo.zipcode + "/" + radius);
      if (res.ok){
        const resText = await res.text();
        this.setState({forumPosts: JSON.parse(resText)})
      } else {
        throw new Error('Request failed!');
      }
    } catch (error){
      console.log(error);
    }
  }

  render() {

    if (!this.state.forumPosts) {
      return (
        <div style={{maxHeight: '500px', textAlign: 'center', verticalAlign: 'middle'}}>
        <Spinner animation="border" variant="primary" style={{marginTop: '250px'}}/>
        </div>
      );
    }

    return (
        <div>
          <Row>
            <Forum 
              profileInfo={this.props.profileInfo} 
              forumPosts={this.state.forumPosts}
            />
          </Row><br/>

          <Row>
            <Col sm={6} md={6} lg={5} xl={4}>
              <Select 
                options={[
                  {label: "1 mile", value: "1"}, 
                  {label: "5 miles", value: "5"}, 
                  {label: "20 miles", value: "20"}, 
                  {label: "50 miles", value: "50"}, 
                  {label: "Max", value: "99999999"}, 
                ]} 
                onChange={this.getForumPosts}
                placeholder="Search Range"
              />
            </Col>

            <Col sm={6} md={6} lg={7} xl={8}>
              <Button onClick={this.handleShow} style={{marginRight: '10px'}}>New Post</Button>
              <Button onClick={this.getForumPosts}>Refresh</Button>
            </Col>
          </Row>

          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Offer to Help!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <PostForm endpoint="http://localhost:9000/forum/post" profileInfo={this.props.profileInfo} onClose={this.handleClose} getForumPosts={this.getForumPosts}/>
            </Modal.Body>
          </Modal>
        </div>
    );
  }
}
