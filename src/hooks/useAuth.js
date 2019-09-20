import React, { useContext, useState, useEffect } from "react";
import AuthContext, {
  isAuthenticated,
  setToken,
  removeToken
} from "./../context/AuthContext";

const fakeTokenFromApi = "test-123456";
const fakeUserFromApi = { name: "Test User", age: 77 };

export const AuthProvider = ({ children }) => {
  const [isAuthed, setIsAuthed] = useState(isAuthenticated());
  const [user, setUser] = useState(null);

  const authenticate = credentials => {
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
  }, []);

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
