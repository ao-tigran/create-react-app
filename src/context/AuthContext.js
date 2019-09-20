import { createContext } from "react";
import { TOKEN } from "./../constants";

const initialState = {
  isAuthed: false,
  authenticate: () => {},
  logout: () => {},
  user: null
};

const AuthContext = createContext(initialState);

export const setToken = token => {
  localStorage.setItem(TOKEN, token);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN);
};

export const isAuthenticated = () => {
  return !!localStorage.getItem(TOKEN);
};

export default AuthContext;
