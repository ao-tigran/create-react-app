import { createContext } from 'react';

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
});

export default AuthContext;
