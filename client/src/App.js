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

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: ""};
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res}))
      .catch(err => err);
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className="Body">
        <p className="App-intro">{this.state.apiResponse}</p>
      </div>
    )
  }
}

class App extends Component {
    constructor(props) {
        super(props);
    }

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