import { createContext } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { TOKEN } from '../constants';

const initialState = {
  isAuthed: false,
  authenticate: () => {},
  logout: () => {},
  isLoading: false,
  error: null,
  user: null,
};

const AuthContext = createContext(initialState);

const getToken = () => localStorage.getItem(TOKEN);

const isJwtTokenExpired = token => {
  const decoded = jwtDecode(token);
  return Date.now() >= decoded.exp * 1000;
};

export const setToken = token => {
  localStorage.setItem(TOKEN, token);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN);
};

export const isAuthenticated = () => {
  const token = getToken();

  return !!token && !isJwtTokenExpired(token);
};

axios.interceptors.request.use(
  config => {
    const token = getToken();

    if (token) {
      Object.assign(config.headers, { Authorization: token });
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.config && error.response && error.response.status === 401) {
      removeToken();
    }
    return Promise.reject(error);
  }
);

export default AuthContext;
