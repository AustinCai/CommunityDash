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
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          First Name:
          <input type="text" onChange={this.handleFirstNameChange}/>
        </label>
        <br/>
        <label>
          Last Name:
          <input type="text" onChange={this.handleLastNameChange}/>
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
          <input type="text" onChange={this.handleZipCodeChange}/>
        </label>
        <br/>
        <input type="submit" value="Register"/>
      </form>
    );
  }
}