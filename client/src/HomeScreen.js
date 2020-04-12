import React from 'react';
import ChatApp from './ChatApp';
import '@progress/kendo-theme-material/dist/all.css';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Background from './groceries_blur.jpg';

import {ForumComponent} from './ForumComponent';

//PROPS: profileInfo
export class HomeScreen extends React.Component {

  render() {
    return (
      <div>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#home" style={{fontFamily: "Candara"}}>
              <b>CommunityDash</b>
          </Navbar.Brand>
        </Navbar>
        <Row>
          <Col sm={{ span: 10, offset: 1 }} md={{ span: 5, offset: 1 }}>
            <div style={{fontFamily: "Verdana"}} className="row mt-3 justify-content-center"><h1><b>Forum</b></h1></div>
            <ForumComponent profileInfo={this.props.profileInfo}/>
          </Col>

          <Col sm={{ span: 10, offset: 1 }} md={{ span: 4, offset: 1 }} className="container">
            <div style={{fontFamily: "Verdana"}} className="row mt-3 justify-content-center"><h1><b>Global Chat</b></h1></div>
            <div className="row mt-3 justify-content-center"><ChatApp username={this.props.profileInfo.firstName}/></div>
          </Col>
        </Row>
        <br/>
        <br/>
        <Navbar sticky="bottom" bg="primary" variant="dark">
          <Col md={11}>
          <Button variant="primary">About</Button>{'  '} 
          <Button variant="primary">Contact Us</Button>{'  '} 
          <Button variant="primary">Feedback</Button>
          </Col>

          <Col md={1}>
            <Button variant="primary">Logout</Button>
          </Col>
        </Navbar>
      </div>
    );
  }
}

export default HomeScreen;
