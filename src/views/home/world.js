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
  recovered: {
    width: 175,
    height: 175,
    backgroundColor: 'green'
  },
  deaths: {
    width: 175,
    height: 175,
    backgroundColor: 'red'
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
      window.location.href = (statistics.slug === "india") ? "/india" : "/country/" + statistics.slug;
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
        <center onClick={this.redirect}>
          <Segment circular style={style.confirmed}>
            <Header as='h2' inverted>
              Confirmed!
              <Header.Subheader style={style.sub}>{this.getNumberWithCommas(statistics.cases)}</Header.Subheader>
            </Header>
          </Segment>
          <Segment circular inverted style={style.recovered}>
            <Header as='h2' inverted>
              Recovered
              <Header.Subheader style={style.sub}>{this.getNumberWithCommas(statistics.recovered)}</Header.Subheader>
            </Header>
          </Segment>
        </center>
        <center style={{marginTop: '-24px'}}>
          <Segment circular inverted style={style.deaths}>
            <Header as='h2' inverted>
              Deaths
              <Header.Subheader style={style.sub}>{this.getNumberWithCommas(statistics.deaths)}</Header.Subheader>
            </Header>
          </Segment>
        </center>
      </div>
    );
  }

}
