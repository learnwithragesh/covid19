import React from 'react';
import { Dropdown } from 'semantic-ui-react';

export default class Head extends React.Component {

  getCountryMap = () => {
    let summary = this.props.summary;
    try {
      let countries = [];
      summary.map((c) => {
        countries.push({key: c.Country, value: c.Country, text: c.Country});
      });
      countries.sort((x, y) => {
        return ((x.key == y.key) ? 0 : ((x.key > y.key) ? 1 : -1));
      });
      return countries;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  render() {
    return (
      <center style={{marginLeft: '5%', marginRight: '5%', marginTop: 20, marginBottom: 20}}>
        <Dropdown clearable fluid search selection options={this.getCountryMap()} placeholder='Select Country'
          onChange={(e, { value }) => this.props.filter("country", value)}/>
      </center>
    );
  }

}
