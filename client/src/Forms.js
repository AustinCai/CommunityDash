import React from 'react';
import Select from 'react-select';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
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
    let newState = {};

    if (event.target){
      newState[event.target.name] = event.target.value;
    } else { 
      newState[event.value] = event.label;
    }
    this.setState(newState);
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log("handleSubmit() sent: ");
    console.log(JSON.stringify(this.state));

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
        this.afterFetch(JSON.parse(resText).token);
        if (this.props.onClose){
          this.props.onClose();
        }
      } else {
        throw new Error('Request failed!');
      }
    } catch (error){
      console.log(error);
    }
  }

  async afterFetch(token) {
  }

  render() {
    return <p>Default form return.</p>
  }
}

// handles submit, then fetches profile
export class LoginForm extends FormWrapper {
  constructor(props){ 
    super(props);
    this.state = {
      show: false,
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }


  handleShow = () => this.setState({show: true});
  handleClose = () => this.setState({show: false});

  async afterFetch(token){
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
        console.log("returned user profile following login: " + JSON.parse(resText));
        this.props.onProfileFetch(JSON.parse(resText));
        this.props.onAuthenticate(); 
      } else {
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

            <Button onClick={this.handleShow}>Register</Button>
          </Form>

          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Register Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <RegisterForm endpoint='http://localhost:9000/user/signup' onClose={this.handleClose}/>
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
    );
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
    this.state = {
      user_id: this.props.profileInfo._id,
      subject: '',
      message: '',
      email: this.props.profileInfo.email,
      tag: '',
      zipcode: this.props.profileInfo.zipcode,
    };
  }

  async afterFetch(token) {
    this.props.getForumPosts();
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

        <Select 
          options={[
            {label: "Food", value: "tag"}, 
            {label: "Medicine", value: "tag"}, 
            {label: "Other", value: "tag"}, 
          ]} 
          onChange={this.handleInputChange}
          placeholder="Select Tag"
        />

        <br/>

        <Button variant="primary" type="submit" onClick={this.handleSubmit}>
          Post
        </Button>
      </Form>
    );
  }
}