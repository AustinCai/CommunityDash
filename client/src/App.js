import React from "react";
import Popup from "reactjs-popup";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

import Button from "react-bootstrap/Button";
import From from "react-bootstrap/Form";

import {DummyButton, TestButton} from "./Buttons";
import {LoginForm, RegisterForm} from "./Forms";
import {HomeScreen} from "./HomeScreen";

import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

class LoginScreen extends React.Component {
  constructor(props){ 
    super(props);
    this.state = {
      show: false,
    };
  }

  handleShow = () => this.setState({show: true});
  handleClose = () => this.setState({show: false});

  render(){
    return (
      <div className="App">
        <header className="App-header">
            <h1 className="App-title">Welcome to CommunityDash!</h1>
        </header>
        <div className="paddedDiv">
          <LoginForm onAuthenticate={this.props.onAuthenticate} onProfileFetch={this.props.onProfileFetch} endpoint='http://localhost:9000/user/login'/>
        </div>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Register Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RegisterForm endpoint='http://localhost:9000/user/signup'/>
          </Modal.Body>
        </Modal>

        <br/>
        <Button onClick={this.handleShow}>Register</Button>
      </div>
    );
  }

}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      profileInfo: null,
    };
    this.handleAuthenticate = this.handleAuthenticate.bind(this);
    this.handleProfileFetch = this.handleProfileFetch.bind(this);
  }

  handleAuthenticate(){
    this.setState({authenticated: true});
  }

  handleProfileFetch(info){
    this.setState({profileInfo: info});
    console.log(this.state.profileInfo);
  }

    render() {
      if (!this.state.authenticated) {
        return <LoginScreen onAuthenticate={this.handleAuthenticate} onProfileFetch={this.handleProfileFetch}/>;
      } else {
        return <HomeScreen profileInfo={this.state.profileInfo}/>;
      }
    }
}

export default App;