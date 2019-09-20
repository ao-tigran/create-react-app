import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "./../config";
import AuthContext, {
  isAuthenticated,
  setToken,
  removeToken
} from "./../context/AuthContext";

export const AuthProvider = ({ children }) => {
  const [isAuthed, setIsAuthed] = useState(isAuthenticated());
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const authenticate = credentials => {
    setIsLoading(true);
    axios
      .post(`${API_URL}/auth`, { ...credentials })
      .then(res => {
        setToken(res.headers.authorization);
        setUser(res.data.result);
        setIsAuthed(isAuthenticated());
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true);
    axios
      .delete(`${API_URL}/auth`)
      .then(res => {
        removeToken(res);
        setIsAuthed(isAuthenticated());
        setUser({});
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  };

  const fetchUserInfo = () => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/auth/me`)
      .then(res => {
        setUser(res.data.result);

        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    isAuthed && fetchUserInfo();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthed,
        authenticate,
        logout,
        user,
        isLoading,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
