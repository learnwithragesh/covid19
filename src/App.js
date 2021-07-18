import React from 'react';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './App.css';
import Header from './views/header';
import Home from './views/home';
import Country from './views/country';
import India from './views/india';
import Footer from './views/footer';

class App extends React.Component {

  componentDidMount() {
    Notification.requestPermission()
    const messaging = window.firebase.messaging();
    messaging.getToken().then((currentToken) => {
      console.log(currentToken);
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
    messaging.onMessage((payload) => {
      console.log('Message received. ', payload);
      // ...
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/country/:country">
              <Country />
            </Route>
            <Route exact path="/india">
              <India />
            </Route>
          </Switch>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
