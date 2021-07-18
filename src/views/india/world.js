import React from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';
import { Header, Segment } from 'semantic-ui-react';

const style = {
  confirmed: {
    width: 175,
    height: 175,
    backgroundColor: '#CCCC00'
  },
  sub: {
    color: 'white',
    fontWeight: 'bold'
  }
}

export default class World extends React.Component {

  redirect = () => {
    let {statistics} = this.props;
    if (statistics && statistics.slug) {
      window.location.href = "/country/" + statistics.slug;
    }
  }

  getNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    let {statistics} = this.props;
    if (!statistics) {
      return <div></div>;
    }
    return (
      <div style={{marginTop: 20, marginBottom: 20}}>
        <center>
          <Segment circular inverted style={style.confirmed}>
            <Header as='h2' inverted>
              Confirmed
              <Header.Subheader style={style.sub}>{this.getNumberWithCommas(statistics.TotalConfirmed)}</Header.Subheader>
            </Header>
          </Segment>
        </center>
      </div>
    );
  }

}
