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

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  async handleSubmit(event) {
    console.log("handleSubmit()");
    console.log(this.state);
    console.log(this.props.endpoint);
    event.preventDefault();

    try {
      const res = await fetch(this.props.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state)
      });
      if (res.ok){
        const resText = await res.text();
        console.log("resText: " + resText);
        this.fetchProfile(JSON.parse(resText).token);
        if (this.props.onClose){
          this.props.onClose();
        }
        console.log("handleSubmit() SUCCESS");
      } else {
        throw new Error('Request failed!');
      }
    } catch (error){
      console.log(error);
    }
  }

  async fetchProfile(token) {
    console.log("fetchProfile() ignored");
  }

  render() {
    return (
      <Row>
        <Col md={{ span: 4, offset: 4 }} lg={{ span: 2, offset: 5 }}>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleInputChange} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleInputChange}/>
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

// handles submit, then fetches profile
export class LoginForm extends FormWrapper {

  async fetchProfile(token){
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
  }

  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control name="firstName" value={this.state.firstName} onChange={this.handleInputChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control name="lastName" value={this.state.lastName} onChange={this.handleInputChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={this.state.email} onChange={this.handleInputChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>ZIP Code</Form.Label>
          <Form.Control name="zipcode" value={this.state.zipcode} onChange={this.handleInputChange} />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={this.handleSubmit}>
          Register
        </Button>
      </Form>
    );
  }
}

export class PostForm extends FormWrapper {
  constructor(props){
    super(props);

    //WHAT DOES THE BACKEND WANT IN THE BODY FOR A NEW POST?
    this.state = {
      email: this.props.profileInfo.email,
      subject: '',
      message: '',
      tag: '',
      zipcode: this.props.profileInfo.zipcode,
    };
  }

  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Label>Subject</Form.Label>
          <Form.Control type="text" name="subject" value={this.state.subject} onChange={this.handleInputChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Message</Form.Label>
          <Form.Control type="text" name="message" value={this.state.message} onChange={this.handleInputChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Tag</Form.Label>
          <Form.Control type="text" name="tag" value={this.state.tag} onChange={this.handleInputChange} />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={this.handleSubmit}>
          Post
        </Button>
      </Form>
    );
  }
}