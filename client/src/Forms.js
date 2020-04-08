import React from 'react';

import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class FormWrapper extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  async handleSubmit(event) {
    console.log('A name was submitted: ' + this.state.email + ", with password: " + this.state.password);
    event.preventDefault();

    try {
      console.log(JSON.stringify(this.state));
      const res = await fetch(this.props.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state)
      });
      if (res.ok){
        const resText = await res.text();
        console.log(resText)
      } else {
        console.log(res)
        throw new Error('Request failed!');
      }
    } catch (error){
      console.log(error);
    }
  }


  render() {
    return (
      <Row>
        <Col md={{ span: 4, offset: 4 }} lg={{ span: 2, offset: 5 }}>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.handleEmailChange} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={this.handleSubmit}>
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export class LoginForm extends FormWrapper {

  async handleSubmit(event) {
    console.log('A name was submitted: ' + this.state.email + ", with password: " + this.state.password);
    event.preventDefault();

    try {
      console.log(JSON.stringify(this.state));
      const res = await fetch(this.props.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state)
      });
      if (res.ok){
        const resText = await res.text();
        this.fetchProfile(JSON.parse(resText).token);
      } else {
        console.log(res)
        throw new Error('Request failed!');
      }
    } catch (error){
      console.log(error);
    }
  }


  async fetchProfile(token){
    console.log('A token was submitted: ' + token);

    try {
      const res = await fetch('http://localhost:9000/user/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': token, 
        },
      });
      if (res.ok){
        const resText = await res.text();
        console.log(resText);
        this.props.onProfileFetch(JSON.parse(resText));
        this.props.onAuthenticate(); 
      } else {
        console.log(res)
        throw new Error('Request failed!');
      }
    } catch (error){
      console.log(error);
    }
  }
}

export class RegisterForm extends FormWrapper {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      zipcode: '',
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleZipCodeChange = this.handleZipCodeChange.bind(this);
  }

  handleFirstNameChange(event) {
    this.setState({firstName: event.target.value});
  }

  handleLastNameChange(event) {
    this.setState({lastName: event.target.value});
  }

  handleZipCodeChange(event) {
    this.setState({zipcode: event.target.value});
  }

  render() {

  }

  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control value={this.state.firstName} onChange={this.handleFirstNameChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control value={this.state.lastName} onChange={this.handleLastNameChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={this.state.email} onChange={this.handleEmailChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={this.state.password} onChange={this.handlePasswordChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>ZIP Code</Form.Label>
          <Form.Control value={this.state.zipcode} onChange={this.handleZipCodeChange} />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={this.handleSubmit}>
          Register
        </Button>
      </Form>
    );
  }
}