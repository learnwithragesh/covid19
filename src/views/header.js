import React from 'react';

export default class Header extends React.Component {

  render() {
    return (
      <div className="head-bar">
        <span>
          <img src={require("../media/covid19.png")}/>
        </span>
        <span>
          <h3>
            Strackit - Stay Home! Stay Safe!
          </h3>
        </span>
      </div>
    );
  }

}
