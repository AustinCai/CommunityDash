import React from "react";
import Button from 'react-bootstrap/Button';

export class ButtonWrapper extends React.Component {
  render() {
    return <Button onClick={() => this.handleClick()}>{this.props.ButtonText}</Button> 
  }
}

export class TestButton extends ButtonWrapper {
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

export class DummyButton extends ButtonWrapper {
  handleClick() {
    console.log("click!");
  }
}

ButtonWrapper.defaultProps = {ButtonText: 'Untitled Button'};