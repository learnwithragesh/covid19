import React from 'react';
import { Dropdown } from 'semantic-ui-react';

export default class Head extends React.Component {

  getProvinceMap = () => {
    let summary = this.props.summary;
    try {
      let province = [];
      summary.map((c) => {
        if (!c.Province || c.Province.trim().length < 1) return ;
        province.push(c.Province);
      });
      province = province.filter((x, i, a) => a.indexOf(x) === i);
      province = province.map((m) => {
        return {key: m, text: m, value: m};
      });
      province.sort((x, y) => {
        return ((x.key == y.key) ? 0 : ((x.key > y.key) ? 1 : -1));
      });
      return province;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  render() {
    let provinceMap = this.getProvinceMap();
    return (
      <center style={{marginLeft: '5%', marginRight: '5%', marginTop: 20, marginBottom: 20}}>
        {provinceMap && provinceMap.length > 0 &&
          <Dropdown clearable fluid search selection options={provinceMap} placeholder='Select Province'
            onChange={(e, { value }) => this.props.filter("province", value)}/>}
      </center>
    );
  }

}
