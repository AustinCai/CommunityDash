import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {Button, TestButton} from "./Buttons";

class ReactWelcome extends React.Component {
  render() {
    return (
      <header className="App-header">
          <h1 className="App-title">Welcome to CommunityDash!</h1>
      </header>
    )
  }
}


class TestForm extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  async handleSubmit(event) {
    console.log('A name was submitted: ' + this.state.username + ", with password: " + this.state.password);
    event.preventDefault();

    try {
      const res = await fetch('http://localhost:9000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
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
          Name:
          <input type="text" value={this.state.username} onChange={this.handleChange}/>
        </label>
        <br/>
        <label>
          Password:
          <input type="text" value={this.state.password} onChange={this.handlePasswordChange}/>
        </label>
        <br/>
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <ReactWelcome/>
                <TestForm/>
            </div>
        );
    }
}

export default App;