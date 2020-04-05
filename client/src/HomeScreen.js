import React from 'react';


export class HomeScreen extends React.Component {
  render() {
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

}