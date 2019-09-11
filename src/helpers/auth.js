import { TOKEN } from '../constants';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const setToken = token => {
  localStorage.setItem(TOKEN, token);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN);
};

export const getToken = () => localStorage.getItem(TOKEN);

export const getAuthHeader = () => {
  return { Authorization: getToken() };
};

export const isJwtTokenExpired = token => {
  const decoded = jwtDecode(token);
  return Date.now() >= decoded.exp * 1000;
};

export const isAuthenticated = () => {
  const token = getToken();

  return token && !isJwtTokenExpired(token);
};

axios.interceptors.request.use(
  config => {
    const token = getToken();

    if (token) {
      Object.assign(config.headers, getAuthHeader());
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
    if (error.config && error.response && error.response.status === 403) {
      removeToken();
    }
    return Promise.reject(error);
  }
);
