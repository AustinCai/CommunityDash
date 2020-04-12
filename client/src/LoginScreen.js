import React from "react";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import {LoginForm} from './Forms';
import {Textfit} from 'react-textfit';

import Background from './groceries.jpg';

var headerStyle = {
  minHeight: '40vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 'calc(10px + 2vmin)',
  color: 'white',

  backgroundImage: `url(${Background})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
}

export class LoginScreen extends React.Component {

  render(){
    return (
      <div style={{textAlign: 'center'}}>
        <Row style={headerStyle}>
          <Card body style={{backgroundColor: '#4287f5'}}>
            <h1><b>Welcome to CommunityDash</b></h1>
          </Card>
        </Row>

        <Row style={{paddingTop: '50px'}}>
          <Col sm={{ span: 10, offset: 1 }} md={{ span: 5, offset: 1 }} lg={{ span: 4, offset: 1 }} xl={{ span: 3, offset: 1 }}>
            <Card body style={{height:'275px'}}>
                <LoginForm 
                  onAuthenticate={this.props.onAuthenticate} 
                  onProfileFetch={this.props.onProfileFetch} 
                  endpoint='http://localhost:9000/user/login'
                />
            </Card>
          </Col>
          <Col sm={{ span: 10, offset: 1 }} md={{ span: 5, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 7, offset: 0 }}>
            <Textfit mode="multi" min={10} style={{color: '#4287f5', height: '275px', fontFamily: "Proxima Nova"}}>
                <i>"An online platform for helping, and getting help from, your community during this time of crisis."</i>
            </Textfit>
          </Col>
        </Row>
      </div>
    );
  }
}