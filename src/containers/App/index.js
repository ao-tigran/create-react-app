import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import SiteWrapper from '../SiteWrapper';
import {
  NotAuthenticatedRoute,
  AuthenticatedRoute,
} from './../AuthenticationRoute';
import LoginScreen from './../../components/LoginScreen';
import HomeScreen from './../../components/HomeScreen';
import AboutScreen from './../../components/AboutScreen';

import { AuthProvider } from './../../hooks/useAuth';

function App() {
  return (
    <AuthProvider>
      <SiteWrapper>
        <Switch>
          <AuthenticatedRoute path="/home" component={HomeScreen} />

          <NotAuthenticatedRoute path="/login" component={LoginScreen} />

          <Route path="/about" component={AboutScreen} />

          <Redirect from="*" to="/home" />
        </Switch>
      </SiteWrapper>
    </AuthProvider>
  );
}

export default App;
