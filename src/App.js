import React from "react";
import { Redirect, Switch, withRouter } from "react-router-dom";

import {
  NotAuthenticatedRoute,
  AuthenticatedRoute
} from "./containers/routes/index";

import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/HomeScreen";
import "./App.css";

const App = ({ isAuthed }) => {
  return (
    <Switch>
      <AuthenticatedRoute
        path="/"
        exact
        component={HomeScreen}
        isAuthed={isAuthed}
      />
      <AuthenticatedRoute
        path="/home"
        component={HomeScreen}
        isAuthed={isAuthed}
      />

      <NotAuthenticatedRoute
        path="/login"
        component={LoginScreen}
        isAuthed={isAuthed}
      />

      <Redirect from="*" to="/home" />
    </Switch>
  );
};

export default withRouter(App);
