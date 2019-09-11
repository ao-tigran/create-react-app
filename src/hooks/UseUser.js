import React, { createContext, useContext, useState } from 'react';

import axios from 'axios';
import { API_URL } from './../config';
import { isAuthenticated, setToken, removeToken } from '../helpers/auth';

const initialState = {
  user: {},
  isAuthed: false,
};

const UserContext = createContext(initialState);

export function UserProvider({ children }) {
  const [isAuthed, setIsAuthed] = useState(isAuthenticated);

  const [user, setUser] = useState({});

  const authenticate = credentials => {
    axios
      .post(`${API_URL}/auth`, { ...credentials })
      .then(res => {
        setToken(res.headers.authorization);
        setUser(res.data.result);
        setIsAuthed(true);
      })
      .catch(err => {
        console.log('err', err);
        //???
      });
  };

  // const logout = () => {

  //axios
  //   .delete(`${API_URL}/auth`)
  //   .then(res => {
  //     removeToken(res);
  //     dispatch(deleteTokenFulfilled(res.data.result));
  //   })
  //   .catch(err => {
  //     dispatch(deleteTokenFailed(err));
  //   });

  //   setToken('awesomeAccessToken123456789');

  //   setAccessToken('awesomeAccessToken123456789');
  //   setIsAuthenticated(true);
  // };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthed,
        authenticate,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
