import React, { Component } from 'react';
import { BrowserRouter , Switch,Route } from 'react-router-dom';

import AdminPanel from "./Pages/AdminPanel";
import HomePage from "./Pages/HomePage";
import User from "./Pages/User";
import NotFound from "./Pages/NotFound";

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
     <BrowserRouter>
         <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/admin" component={AdminPanel} />
            <Route exact path="/user" component={User} />
            <Route path="*" component={NotFound} />
        </Switch>
    </BrowserRouter>
      
   
    );
  }
}
