import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class HomeScreen extends React.Component {
  render() {
    return (

      <Container>
        <Row style={{backgroundColor: 'maroon'}}>
          <Col xs={1}/>
          <Col style={{backgroundColor: 'white', margin: "10px", marginLeft: '0px'}}>
            <h1> Forum </h1>
            <div style={{minHeight: '500px'}}>
              <img src={require('./forum_img.png')} style={{maxWidth: '100%'}}/>
            </div>
          </Col>
          <Col style={{backgroundColor: 'white', margin: "10px", marginLeft: '0px'}}>
            <h1> Chat </h1>
            <div style={{minHeight: '500px'}}>
              <img src={require('./chat_img.png')} style={{maxWidth: '100%'}}/>
            </div>
          </Col>
          <Col xs={1}/>
        </Row>

        <Row style={{alignItems: 'center', justifyContent: 'center'}}>
          <h2>User Info:</h2>
          <p>{JSON.stringify(this.props.profileInfo)}</p>
        </Row>
      </Container>

    );
  }
}
