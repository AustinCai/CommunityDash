import React from 'react';
import ChatApp from './ChatApp';
import '@progress/kendo-theme-material/dist/all.css';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {ForumComponent} from './ForumComponent';
import {SearchComponent} from './Search';

//PROPS: profileInfo
export class HomeScreen extends React.Component {

  render() {
    return (
      <Row>
        <Col md={6}>
          <SearchComponent/>
          <ForumComponent profileInfo={this.props.profileInfo}/>
        </Col>

        <Col md={6} className="container">
          <div className="row mt-3 justify-content-center"><h1>Global Chat</h1></div>
          <div className="row mt-3 justify-content-center"><ChatApp username={this.props.profileInfo.firstName}/></div>
        </Col>
      </Row>
    );
  }
}

export default HomeScreen;
