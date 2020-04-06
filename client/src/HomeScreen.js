import React from 'react';

export class HomeScreen extends React.Component {
  render() {
    return (
      <div className="App">

        <div className="row" style={{backgroundColor: 'maroon'}}>
          <div className='col-1'/>
          <div className="col-5" style={{backgroundColor: 'white', margin: "10px", marginLeft: '0px'}}>
            <h1> Forum </h1>
            <div style={{minHeight: '500px'}}>
              <img src={require('./forum_img.png')} style={{maxWidth: '100%'}}/>
            </div>
          </div>
          <div className="col-5" style={{backgroundColor: 'white', margin: "10px", marginLeft: '0px'}}>
            <h1> Chat </h1>
            <div style={{minHeight: '500px'}}>
              <img src={require('./chat_img.png')} style={{maxWidth: '100%'}}/>
            </div>
          </div>
        </div>

        <div className="row" style={{alignItems: 'center', justifyContent: 'center'}}>
          <h2>User Info:</h2>
          <p>{JSON.stringify(this.props.profileInfo)}</p>
        </div>
      </div>
    );
  }

}
