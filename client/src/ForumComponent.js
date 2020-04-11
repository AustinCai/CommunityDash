import React from 'react';
import Select from 'react-select';

import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ListGroup from "react-bootstrap/ListGroup";

import {PostForm} from './Forms';

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
        <ListGroup>
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
        <ListGroup.Item key={i} style={{width: '50vw'}}>
          <h5><b>{this.props.forumPosts[i].subject}</b></h5>
        <br/>
          <p>{this.props.forumPosts[i].message}</p>
          <p>{this.props.forumPosts[i].tag}</p>
          <p><i>{this.props.forumPosts[i].email}</i></p> <Button>Contact</Button>
        </ListGroup.Item>
      );
    }
    return forumPostsDisplay;
  }



  render() {
    return (
      <div style={{maxHeight: '530px', overflowY: 'auto'}}>
        
        <Tabs
          id="controlled-tab-example"
          onSelect={(k) => this.setState({key: k})}
          activeKey={this.state.key}
        >
          <Tab eventKey="All" title="All">
            <ListGroup>
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
    const radius = event ? event.label : "0";

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
    return (
        <div>
          <div className="row mt-3 justify-content-center"><h1>Forum</h1></div>
          <div className="row mt-3 justify-content-center"><Forum profileInfo={this.props.profileInfo} forumPosts={this.state.forumPosts}/></div>
          <br/>
          <Row>
            <Button onClick={this.handleShow} style={{marginRight:'25px'}}>New Post</Button>
            <Button onClick={this.getForumPosts} style={{marginRight:'25px'}}>Refresh</Button>
            <Select 
              options={[
                {label: "1"}, 
                {label: "5"}, 
                {label: "20"}, 
                {label: "100000"}, 
              ]} 
              style={{width: '300px'}}
              onChange={this.getForumPosts}
              placeholder="Search Range"
            />
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
