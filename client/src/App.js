import React from "react";

import {HomeScreen} from "./HomeScreen";
import {LoginScreen} from "./LoginScreen";

import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

// const backgroundImageStyle = {
//   backgroundImage: url('./groceries.jpg')
// }


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      profileInfo: null,
    };
    this.handleAuthenticate = this.handleAuthenticate.bind(this);
    this.handleProfileFetch = this.handleProfileFetch.bind(this);
  }

  handleAuthenticate(){
    this.setState({authenticated: true});
  }

  handleProfileFetch(info){
    console.log("info is passed in as: " + info);
    console.log(info);
    this.setState({profileInfo: info });
    console.log("profileInfo on uppermost state: " + this.state.profileInfo);
    console.log(this.state.profileInfo);
  }

    render() {
      if (!this.state.authenticated) {
        return <LoginScreen onAuthenticate={this.handleAuthenticate} onProfileFetch={this.handleProfileFetch}/>;
      } else {
        return <HomeScreen profileInfo={this.state.profileInfo}/>;
      }
    }
}

export default App;