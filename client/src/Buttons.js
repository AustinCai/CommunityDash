import React from "react";

export class Button extends React.Component {
  render() {

    return <button onClick={() => this.handleClick()}>{this.props.ButtonText}</button> 
  }
}

export class TestButton extends Button {
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

export class DummyButton extends Button {
  handleClick() {
    console.log("click!");
  }
}

Button.defaultProps = {ButtonText: 'Untitled Button'};