import React from 'react';
import { Dimmer, Loader, Header } from 'semantic-ui-react'

export default class Load extends React.Component {

  render() {
    return (
      <div>
        <Dimmer active={this.props.load} page>
          <Loader />
          <Header as='h2' icon inverted style={{marginTop: 100}}>
            {this.props.message}
          </Header>
        </Dimmer>
      </div>
    );
  }

}
