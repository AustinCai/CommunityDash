import React, { Component } from 'react';
import ChatApp from './ChatApp';
import '@progress/kendo-theme-material/dist/all.css';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


class Forum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forumPosts: null
    };
  }

  async getForumPosts() {
    try {
      const res = await fetch("http://localhost:9000/forum/tag/food");
      if (res.ok){
        const resText = await res.text();
        this.setState({forumPosts: resText})
      } else {
        throw new Error('Request failed!');
      }
    } catch (error){
      console.log(error);
    }
  }

  componentDidMount(){
    this.getForumPosts();
  }

  render() {
    console.log(this.state.forumPosts);
    return (
      <div>
        <h1>Forum</h1>
        <br/>
        <p>{this.state.forumPosts}</p>
      </div>
    );
  }
}

export class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'test',
      loggedIn: false
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }


  handleLogin(event) {
    event.preventDefault();
    this.setState({ loggedIn: true });
  }
  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }


  render() {
    return (
      <Row>
        <Col md={6}>
          <div className="row mt-3 justify-content-center"><Forum/></div>
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
