import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';

import './home.css';
import Load from '../../util/load';
import Head from './head';
import World from './world';

export default class Home extends React.Component {

  state = {summary: []}

  componentDidMount() {
    this.getStats();
    this.getSummary();
  }

  getStats = () => {
    let url = "https://coronavirus-19-api.herokuapp.com/all";
    $.ajax({url, method: "GET", beforeSend: () => {
      this.setState({load: true, message: "Getting Statistcs"});
    }, success: (data) => {
      this.setState({statistics: data, load: false});
    }, error: (e) => {
      this.setState({load: false});
      console.log(e);
    }});
  }

  getSummary = () => {
    let url = "https://api.covid19api.com/summary";
    $.ajax({url, method: "GET", beforeSend: () => {
      this.setState({load: true, message: "Getting Data"});
    }, success: (data) => {
      data = data.Countries;
      data.sort((x, y) => {
        return (x.TotalConfirmed === y.TotalConfirmed ? 0 : x.TotalConfirmed > y.TotalConfirmed ? -1 : 1);
      });
      this.setState({summary: data, load: false});
    }, error: (e) => {
      this.setState({load: false});
      console.log(e);
    }});
  }

  getTotal = (data) => {
    let TotalConfirmed = 0;
    let TotalRecovered = 0;
    let TotalDeaths = 0;
    data.map((d) => {
      TotalConfirmed += d.TotalConfirmed;
      TotalRecovered += d.TotalRecovered;
      TotalDeaths += d.TotalDeaths;
    });
    return {Country: "World", TotalConfirmed, TotalRecovered, TotalDeaths};
  }

  getNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  getStatistics = () => {
    for (var i = 0; i < this.state.summary.length; i++) {
      let summary = this.state.summary[i];
      if (summary.Country === this.state.country) {
        return {cases: summary.TotalConfirmed, recovered: summary.TotalRecovered, deaths: summary.TotalDeaths,
          slug: summary.Slug};
      }
    }
    console.log(this.state.statistics);
    return this.state.statistics;
  }

  render() {
    let statistics = this.getStatistics();
    return (
      <div>
        <Load load={this.state.load} message={this.state.message}/>
        <center className="ad">
          <a href="https://strackit.com/random" target="_blank">
            <p>Click Here for Breaking News</p>
          </a>
        </center>
        <Head summary={this.state.summary} filter={(key, value) => this.setState({[key]: value})}/>
        <p style={{color: 'white', marginLeft: '5%'}}>
          <ul>
            <li>Click on Country Name to View Detailed Report</li>
            <li>Actual Report may vary</li>
          </ul>
        </p>
        <World statistics={statistics}/>
        <center>
          <table width='95%' border="1" style={{marginLeft: '0.5%', marginRight: '0.5%'}}>
            <tr>
              <th>Country</th>
              <th className="confirmed">Confirmed</th>
              <th className="recovered">Recovered</th>
              <th className="deaths">Deaths</th>
            </tr>
            {
              this.state.summary.map((c) => {
                if (this.state.country && this.state.country !== c.Country) return;
                return (
                  <tr>
                    <td>
                      <Link to={c.Slug === "india" ? "/india" : "/country/" + c.Slug}>
                        {c.Country}
                      </Link>
                    </td>
                    <td className="confirmed">
                      {this.getNumberWithCommas(c.TotalConfirmed)}
                    </td>
                    <td className="recovered">
                      {this.getNumberWithCommas(c.TotalRecovered) + " - " +
                        parseFloat(c.TotalRecovered / c.TotalConfirmed * 100).toFixed(2) + "%"}
                    </td>
                    <td className="deaths">
                      {this.getNumberWithCommas(c.TotalDeaths) + " - " +
                        parseFloat(c.TotalDeaths / c.TotalConfirmed * 100).toFixed(2) + "%"}
                    </td>
                  </tr>
                );
              })
            }
          </table>
        </center>
      </div>
    );
  }

}
