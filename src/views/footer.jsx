import React from 'react';
import { Grid } from 'semantic-ui-react';

export default class Footer extends React.Component {

  render() {
    return (
      <footer>
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <ul>
                <li>Wash your hands frequently</li>
                <li>Maintain social distancing</li>
                <li>Avoid touching eyes, nose and mouth</li>
                <li>Protect yourself and others from getting sick</li>
              </ul>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <center style={{color: 'white'}}>
                <a href="https://strackit.com">
                  <img src={require("../media/strackit.png")}
                    style={{width: 80, height: 80}}/>
                  <h2 style={{marginTop: '-10px'}}>Strackit</h2>
                </a>
              </center>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </footer>
    );
  }

}
