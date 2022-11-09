import React from 'react';
import './App.css';
import {LoginForm} from './components/session/login_form'
import { SignupForm } from './components/session/signup_form';
import { Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Route path="/login" component={LoginForm} />
      <Route path="/signup" component={SignupForm} />
    </div>
  );
}

export default App;
