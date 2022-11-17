import React from 'react';
import './App.css';
import LoginForm from './components/session/login_form'
import SignupForm from './components/session/signup_form';
import { UserProfilePage } from './components/profile/userProfilePage';
import { Route, Switch } from "react-router-dom"
import { HomePage } from './components/homepage/homepage'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/profile" component={UserProfilePage}/>
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignupForm} /> 
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
