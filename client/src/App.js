import React from "react";
import Popup from "reactjs-popup";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

import {DummyButton, TestButton} from "./Buttons";
import {LoginForm, RegisterForm} from "./Forms";

import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function HomeScreen(props) {
  return (
    <div className="row" style={{'background-color': 'maroon'}}>
      <div className='col-1'/>
      <div className="col-5" style={{'background-color': 'white', 'margin': "10px", 'margin-left': '0px'}}>
        <h1> Forum </h1>
        <div style={{'min-height': '500px'}}>
          <img src={require('./forum_img.png')} style={{'max-width': '100%'}}/>
        </div>
      </div>
      <div className="col-5" style={{'background-color': 'white', 'margin': "10px", 'margin-left': '0px'}}>
        <h1> Chat </h1>
        <div style={{'min-height': '500px'}}>
          <img src={require('./chat_img.png')} style={{'max-width': '100%'}}/>
        </div>
      </div>
    </div>
  );
}

function LoginScreen(props) {
    return (
      <div>
        <header className="App-header">
            <h1 className="App-title">Welcome to CommunityDash!</h1>
        </header>
        <div className="paddedDiv">
          <LoginForm endpoint='http://localhost:9000/user/login'/>
          <TestButton />
        </div>
        <Link to={'/home'}>
          <DummyButton ButtonText="sudo Login"/>
        </Link>
        <Popup modal trigger={<button>Register</button>}>
          <RegisterForm endpoint='http://localhost:9000/user/signup'/>
        </Popup>
      </div>
    );
}

class App extends React.Component {
    render() {
        return (
          <Router>
            <div className="App">
                <Route exact={true} path = '/' component={LoginScreen}/>
                <Route path='/home' component={HomeScreen}/>
            </div>
          </Router>
        );
    }
}

export default App;