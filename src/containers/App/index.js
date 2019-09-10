import React, { useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import AuthContext from './../../context/AuthContext';
import SiteWrapper from '../SiteWrapper';
import AuthenticationRoute from './../AuthenticationRoute';
import LoginScreen from './../../components/LoginScreen';
import HomeScreen from './../../components/HomeScreen';
import { isAuthenticated } from '../../helpers/auth';

function App() {
  const [auth, setAuth] = useState({
    user: null,
    isAuthenticated: isAuthenticated(),
    loading: false,
    error: null,
  });

  const authenticate = payload => {
    console.log('attempt to login with credentials: ', payload);
    setAuth({ ...auth, ...payload });
  };

  const logout = payload => {
    console.log('attempt to logout');
  };

  return (
    <AuthContext.Provider value={{ ...auth, authenticate, logout }}>
      <SiteWrapper>
        <Switch>
          <AuthenticationRoute
            path="/login"
            withAuth={false}
            component={LoginScreen}
            redirectOnFailure="/home"
          />
          <AuthenticationRoute
            path="/"
            withAuth={true}
            redirectOnFailure="/login"
            render={() => (
              <Switch>
                <Route path="/home" component={HomeScreen} />

                <Redirect to="/home" />
              </Switch>
            )}
          />
        </Switch>
      </SiteWrapper>
    </AuthContext.Provider>
  );
}

export default App;
