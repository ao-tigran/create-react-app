import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { AuthProvider } from './../../hooks/useAuth';
import {
  NotAuthenticatedRoute,
  AuthenticatedRoute,
} from './../AuthenticationRoute';
import LoginScreen from './../../components/LoginScreen';
import HomeScreen from './../../components/HomeScreen';
import AboutScreen from './../../components/AboutScreen';

function App() {
  return (
    <AuthProvider>
      <Switch>
        <AuthenticatedRoute path="/home" component={HomeScreen} />

        <NotAuthenticatedRoute path="/login" component={LoginScreen} />

        <Route path="/about" component={AboutScreen} />

        <Redirect from="*" to="/home" />
      </Switch>
    </AuthProvider>
  );
}

export default App;
