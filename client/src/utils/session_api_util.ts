import axios from 'axios'
import { userSignupDataObject, userLoginDataObject } from '../types/session';

export const setAuthToken = (token: any) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

export const test = () => {
  return axios.get('/api/users/test')
}

export const signup = (userData: userSignupDataObject) => {
  return axios.post('/api/users/register', userData);
};

export const login = (userData: userLoginDataObject) => {
  return axios.post('/api/users/login', userData);
};

export const logout = () => {
  localStorage.removeItem('jwtToken')
  setAuthToken(false)
}