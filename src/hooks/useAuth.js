import React, { useContext, useState, useEffect } from "react";
import { isAuthenticated, setToken, removeToken } from "./../helpers/auth.js";
import { createContext } from "react";

const fakeTokenFromApi = "test-123456";
const fakeUserFromApi = { name: "Test User", age: 77 };

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthed, setIsAuthed] = useState(isAuthenticated());
  const [user, setUser] = useState(null);

  const authenticate = credentials => {
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
    isAuthed && fetchUserInfo();
  }, [isAuthed]);

  return (
    <AuthContext.Provider
      value={{
        isAuthed,
        authenticate,
        logout,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
