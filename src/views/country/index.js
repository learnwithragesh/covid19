import React from 'react';
import $ from 'jquery';
import { useParams } from 'react-router-dom';

import Load from '../../util/load';
import Head from './head';

class Country extends React.Component {

  state = {details: []}

  componentDidMount() {
    this.getDetails();
  }

  getDetails = () => {
    let { country } = this.props.params;
    let url = "https://api.covid19api.com/live/country/" + country + "/status/confirmed/date/2020-03-21T00:00:00Z";
    $.ajax({url, method: "GET", beforeSend: () => {
      this.setState({load: true, message: "Getting Data"});
    }, success: (data) => {
      data = data.reverse();
      this.setState({details: data, load: false});
      console.log(data);
    }, error: (e) => {
      console.log(e);
      this.setState({load: false});
    }});
  }

  getNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    return (
      <div>
        <Load load={this.state.load} message={this.state.message}/>
        <Head summary={this.state.details} filter={(key, value) => this.setState({[key]: value})}/>
        <p style={{color: 'white', marginLeft: '5%'}}>
          <ul>
            <li>Actual Report may Vary a Little</li>
          </ul>
        </p>
        <center>
          <table width='95%' border="1" style={{marginLeft: 10, marginRight: 20}}>
            <tr>
              <th>Country</th>
              <th>Province</th>
              <th className="confirmed">Confirmed</th>
              <th>Date</th>
            </tr>
            {
              this.state.details.map((c) => {
                if (this.state.province && this.state.province !== c.Province) return;
                return (
                  <tr>
                    <td>{c.Country}</td>
                    <td>{c.Province}</td>
                    <td className="confirmed">{this.getNumberWithCommas(c.Cases)}</td>
                    <td>{c.Date.replace("T", " ").replace("Z", "")}</td>
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

export default (props) => {
  return <Country {...props} params={useParams()}/>
}
