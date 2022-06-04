import React, { Component } from 'react';
import { BrowserRouter , Switch,Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import AdminPanel from "./Pages/AdminPanel";
import HomePage from "./Pages/HomePage";
import User from "./Pages/User";
import NotFound from "./Pages/NotFound";

import SignUp from './Pages/SignUp';
import LoginForm from './Pages/LoginForm';
import NavBar from './Components/NavBar';
import VoiturePage from './Pages/VoiturePage';
import LocationPage from './Pages/LocationPage';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
     <BrowserRouter>
        <NavBar/>
         <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/admin" component={AdminPanel} />
            <Route exact path="/user" component={User} />
            <Route exact path="/voiture" component={VoiturePage} />
            <Route exact path="/location" component={LocationPage} />
            <Route exact path="/sign-in" component={LoginForm} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route path="*" component={NotFound} />
        </Switch>
    </BrowserRouter>
      
   
    );
  }
}
