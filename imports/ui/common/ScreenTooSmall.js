import React from 'react';

class ScreenTooSmall extends React.Component {
  render () {
    return (
      <div id="screenTooSmall" style={{display: 'none'}}>
        <div className="alert alert-info" style={{margin: '15px'}}>The dashboard is not loaded because your screen is too small, please resize the screen to a width greater than 770px.</div>
      </div>
    );
  }
}

export default ScreenTooSmall;
