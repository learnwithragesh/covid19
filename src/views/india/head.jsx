import React from 'react';
import { Dropdown } from 'semantic-ui-react';

export default class Head extends React.Component {

  getStateMap = () => {
    let summary = this.props.summary;
    try {
      let states = [];
      summary.map((c) => {
        states.push({key: c.State, value: c.State, text: c.State});
      });
      states.sort((x, y) => {
        return ((x.key == y.key) ? 0 : ((x.key > y.key) ? 1 : -1));
      });
      return states;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  render() {
    return (
      <center style={{marginLeft: '5%', marginRight: '5%', marginTop: 20, marginBottom: 20}}>
        <Dropdown clearable fluid search selection options={this.getStateMap()} placeholder='Select State'
          onChange={(e, { value }) => this.props.filter("state", value)}/>
      </center>
    );
  }

}
