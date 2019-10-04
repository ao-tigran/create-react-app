import React, { useContext, useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import { isAuthenticated, setToken, removeToken } from '../helpers/auth';

const fakeTokenFromApi = 'test-123456';
const fakeUserFromApi = {
  name: 'Test User',
  age: 77,
};

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthed, setIsAuthed] = useState(isAuthenticated());
  const [user, setUser] = useState(null);

  const authenticate = () => {
    // TODO: Actually authenticate
    setToken(fakeTokenFromApi);
    setUser(fakeUserFromApi);
    setIsAuthed(isAuthenticated());
  };

  const logout = () => {
    removeToken();
    setUser(null);
    setIsAuthed(false);
  };

  const fetchUserInfo = () => {
    setUser(fakeUserFromApi);
  };

  useEffect(() => {
    if (isAuthed) {
      fetchUserInfo();
    }
  }, [isAuthed]);

  return (
    <AuthContext.Provider
      value={{
        isAuthed,
        authenticate,
        logout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useAuth = () => useContext(AuthContext);
