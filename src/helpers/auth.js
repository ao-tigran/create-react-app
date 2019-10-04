import TOKEN from '../constants';

export const setToken = (token) => {
  localStorage.setItem(TOKEN, token);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN);
};

export const isAuthenticated = () => !!localStorage.getItem(TOKEN);
