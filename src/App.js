import React from "react";
import { Switch, Redirect, Route, withRouter } from "react-router-dom";

import AuthenticationRoute from "./containers/AuthenticationRoute";

import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/HomeScreen";
import "./App.css";

const App = ({ isAuthenticated }) => {
  return (
    <Switch>
      <AuthenticationRoute
        path="/login"
        withAuth={false}
        component={LoginScreen}
        redirectOnFailure="/home"
        isAuthenticated={isAuthenticated}
      />
      <AuthenticationRoute
        path="/"
        withAuth={true}
        redirectOnFailure="/login"
        isAuthenticated={isAuthenticated}
        render={() => (
          <Switch>
            <Route path={"/home"} component={HomeScreen} />

            <Redirect to="/home" />
          </Switch>
        )}
      />
    </Switch>
  );
};

export default withRouter(App);
