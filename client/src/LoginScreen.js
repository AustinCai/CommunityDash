import React from "react";

import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal'

import {LoginForm, RegisterForm} from './Forms';


export class LoginScreen extends React.Component {
  constructor(props){ 
    super(props);
    this.state = {
      show: false,
    };
    this.handleClose = this.handleClose.bind(this);
  }

  handleShow = () => this.setState({show: true});
  handleClose = () => this.setState({show: false});

  render(){
    return (
      <div className="App">
        <header className="App-header" /*style={backgroundImageStyle}*/>
            <h1 className="App-title">Welcome to CommunityDash!</h1>
        </header>
        <div className="paddedDiv">
          <LoginForm onAuthenticate={this.props.onAuthenticate} onProfileFetch={this.props.onProfileFetch} endpoint='http://localhost:9000/user/login'/>
        </div>
        
        <Button onClick={this.handleShow}>Register</Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Register Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RegisterForm endpoint='http://localhost:9000/user/signup' onClose={this.handleClose}/>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}