import React, { Component } from 'react';
import Login from './Login';
import ChatApp from './ChatApp';
import '@progress/kendo-theme-material/dist/all.css';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import ListGroup from "react-bootstrap/ListGroup";

import {Forum} from './Forum';
import {PostForm} from './Forms';
import {TestButton, MakeForumPostButton} from './Buttons';

export class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'test',
      loggedIn: false,
      show: false
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }

  handleShow = () => this.setState({show: true});
  handleClose = () => this.setState({show: false});

  handleLogin(event) {
    event.preventDefault();
    this.setState({ loggedIn: true });
  }
  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }


  render() {
    //console.log("HomeScreen render()");
    //console.log(this.props.profileInfo);

    return (
      <Row>
        <Col md={6}>
          <div className="row mt-3 justify-content-center"><h1>Forum</h1></div>
          <div className="row mt-3 justify-content-center"><Forum profileInfo={this.props.profileInfo}/></div>
          <div className="row mt-3 justify-content-center"><Button onClick={this.handleShow}>Make Post</Button></div>

          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Offer to Help!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <PostForm endpoint="http://localhost:9000/forum/post" profileInfo={this.props.profileInfo}/>
            </Modal.Body>
          </Modal>

        </Col>

        <Col md={6} className="container">
          <div className="row mt-3 justify-content-center"><h1>Global Chat</h1></div>
          <div className="row mt-3 justify-content-center"><ChatApp username={this.props.profileInfo.firstName}/></div>
        </Col>
      </Row>
    );
  }
}

export default HomeScreen;
