import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {HashRouter} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';

import { setAuthToken, logout } from './utils/session_api_util';
import jwt_decode from "jwt-decode"
import { createContext } from 'react';

let loggedIn:any = false 
const sessionContext = createContext(loggedIn)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

document.addEventListener('DOMContentLoaded', () => {

  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decodedUser:any = jwt_decode(localStorage.jwtToken);

    const currentTime = Date.now() / 1000;

    if (decodedUser.exp < currentTime) {
      logout()
      window.location.href = '/login';
    }
    
    loggedIn = {decodedUser, loggedIn: true}
  }
})



root.render(
  <React.StrictMode>
    <HashRouter>
      <sessionContext.Provider value={loggedIn}>
        <App />
      </sessionContext.Provider>
    </HashRouter>
  </React.StrictMode>
);


reportWebVitals();
