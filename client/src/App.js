import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class ReactWelcome extends React.Component {
  render() {
    return (
      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React!</h1>
      </header>
    )
  }
}

class Button extends React.Component {
  render() {
    return <button onClick={() => this.handleClick()}>{this.props.ButtonText}</button>
    
  }
}

class TestButton extends Button {
  async handleClick() {
    try {
      const res = await fetch('http://localhost:9000/button');
      if (res.ok){
        const resText = await res.text();
        console.log(resText)
      } else {
        throw new Error('Request failed!');
      }
    } catch (error){
      console.log(error);
    }
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
        <label>
          Password:
          <input type="text" value={this.state.password} onChange={this.handlePasswordChange}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <ReactWelcome/>
                <TestButton ButtonText = "Test Button (counts number of clicks)"/>
                <TestForm/>
            </div>
        );
    }
}

export default App;