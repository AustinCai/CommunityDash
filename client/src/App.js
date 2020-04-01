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

  constructor(props) {
    super(props);
    this.state = {
      clickCount: 0,
    }
  }

  async handleClick() {
    this.setState({
      clickCount: this.state.count + 1
    })
  }

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

class LoginButton extends Button {
  async handleClick() {
    try {
      const res = await fetch('http://localhost:9000/login', {
        method: 'POST',
        body: JSON.stringify({
          username: "austin",
          password: "querty",
        })
      });
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

class Body extends React.Component {

  render() {
    return (
      <div className="Body">
        <TestButton ButtonText = "Hello world"/>
        <LoginButton ButtonText = "Login2"/>
      </div>
    )
  }
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <ReactWelcome/>
                <Body/>
            </div>
        );
    }
}

export default App;