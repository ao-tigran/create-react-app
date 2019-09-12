import { createContext } from 'react';

const initialState = {
  isAuthed: false,
  authenticate: () => {},
  logout: () => {},
  isLoading: false,
  error: null,
  user: null,
};

const AuthContext = createContext(initialState);

export default AuthContext;
