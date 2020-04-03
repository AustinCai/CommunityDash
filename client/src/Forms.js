import React from 'react';

export class LoginForm extends React.Component {
  
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
      const res = await fetch(this.props.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        })
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
      <form onSubmit={this.handleSubmit}>
        <label>
          Email:
          <input type="text" value={this.state.email} onChange={this.handleEmailChange}/>
        </label>
        <br/>
        <label>
          Password:
          <input type="text" value={this.state.password} onChange={this.handlePasswordChange}/>
        </label>
        <br/>
        <input type="submit" value="Login"/>
      </form>
    );
  }
}

export class RegisterForm extends LoginForm {
  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      zipCode: '',
    };
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          First Name:
          <input type="text"/>
        </label>
        <br/>
        <label>
          Last Name:
          <input type="text"/>
        </label>
        <br/>
        <label>
          Email:
          <input type="text" value={this.state.email} onChange={this.handleEmailChange}/>
        </label>
        <br/>
        <label>
          Password:
          <input type="text" value={this.state.password} onChange={this.handlePasswordChange}/>
        </label>
        <br/>
        <label>
          Confirm Password:
          <input type="text"/>
        </label>
        <label>
          ZIP Code:
          <input type="text"/>
        </label>
        <br/>
        <input type="submit" value="Register"/>
      </form>
    );
  }
}