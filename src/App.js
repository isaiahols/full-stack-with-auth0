import React, { Component } from 'react';
import { HashRouter, Switch, Route } from "react-router-dom";

import Login from './components/Login/login';
import Private from './components/Private/private';

import './App.css';



class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/private' component={Private} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
