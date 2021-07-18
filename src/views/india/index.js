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
    this.getSummary();
  }

  getSummary = () => {
    let url = "https://api.covid19india.org/state_district_wise.json";
    $.ajax({url, method: "GET", beforeSend: () => {
      this.setState({load: true, message: "Getting Data"});
    }, success: (data) => {
      data = this.processData(data);
      this.setState({summary: data, load: false})
    }, error: (e) => {
      this.setState({load: false});
      console.log(e);
    }});
  }

  processData = (data) => {
    let arr = [];
    let states = Object.keys(data);
    states.map((state) => {
      if (state == "Unknown") {
        return ;
      }
      let districts = Object.keys(data[state].districtData);
      let obj = {State: state, Districts: []}, total = 0;
      districts.map((d) => {
        let c = data[state].districtData[d].confirmed;
        obj.Districts.push({District: d, TotalConfirmed: c});
        total += c;
      });
      obj.Districts.sort((x, y) => {
        return (x.TotalConfirmed === y.TotalConfirmed ? 0 : x.TotalConfirmed > y.TotalConfirmed ? -1 : 1);
      });
      obj.TotalConfirmed = total;
      arr.push(obj);
    });
    arr.sort((x, y) => {
      return (x.TotalConfirmed === y.TotalConfirmed ? 0 : x.TotalConfirmed > y.TotalConfirmed ? -1 : 1);
    });
    return arr;
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
    return this.state.statistics;
  }

  getStateInfo = (summary) => {
    let total = 0;
    for (var i = 0; i < summary.length; i++) {
      let s = summary[i];
      if (s.State === this.state.state) {
        return s;
      }
      total += s.TotalConfirmed;
    }
    return {State: "India", TotalConfirmed: total};
  }

  render() {
    let stateInfo = this.getStateInfo(this.state.summary);
    let info = (stateInfo.State === "India") ? (
      <table width='95%' border="1" style={{marginLeft: '0.5%', marginRight: '0.5%'}}>
        <tr>
          <th>State</th>
          <th className="confirmed">Confirmed</th>
          <th className="confirmed">Districts</th>
        </tr>
        {
          this.state.summary.map((c) => {
            if (this.state.state && this.state.state !== c.State) return;
            return (
              <tr onClick={() => this.setState({state: c.State})}>
                <td>{c.State}</td>
                <td className="confirmed">
                  {this.getNumberWithCommas(c.TotalConfirmed)}
                </td>
                <td className="confirmed">
                  {this.getNumberWithCommas(c.Districts.length)}
                </td>
              </tr>
            );
          })
        }
      </table>
    ) : (
      <table width='95%' border="1" style={{marginLeft: '0.5%', marginRight: '0.5%'}}>
        <tr>
          <th>District</th>
          <th className="confirmed">Confirmed</th>
        </tr>
        {
          stateInfo.Districts.map((c) => {
            return (
              <tr>
                <td>{c.District}</td>
                <td className="confirmed">
                  {this.getNumberWithCommas(c.TotalConfirmed)}
                </td>
              </tr>
            );
          })
        }
      </table>
    );
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
            <li>Data from covid19india.org</li>
            <li>Actual Report may vary</li>
          </ul>
        </p>
        <World statistics={stateInfo}/>
        <center>
          {info}
        </center>
      </div>
    );
  }

}
