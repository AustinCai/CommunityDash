import React from 'react';

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import ListGroup from "react-bootstrap/ListGroup";

import {PostForm} from './Forms';

export class Forum extends React.Component {
  
  buildForumJSX(){
    if (!this.props.forumPosts){
      return null;
    }

    const forumPostsDisplay = [];
    for (let i = 0; i < this.props.forumPosts.length; i++){
      forumPostsDisplay.push(
        <ListGroup.Item key={i}>
          <h5><b>{this.props.forumPosts[i].subject}</b></h5>
        <br/>
          <p>{this.props.forumPosts[i].message}</p>
          <p><i>{this.props.forumPosts[i].email}</i></p>
        </ListGroup.Item>
      );
    }
    return forumPostsDisplay;
  }

  render() {
    return (
      <div style={{maxHeight: '530px', overflowY: 'auto'}}>
        <ListGroup>
          {this.buildForumJSX()}
        </ListGroup>
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

  async getForumPosts() {
    try {
      const res = await fetch("http://localhost:9000/forum/zipcode/" + this.props.profileInfo.zipcode);
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
          <div className="row mt-3 justify-content-center">
            <Button onClick={this.handleShow} style={{marginRight:'25px'}}>Make Post</Button>
            <Button onClick={this.getForumPosts}>Refresh Offers</Button>
          </div>

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
