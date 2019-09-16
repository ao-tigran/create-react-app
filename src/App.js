import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/HomeScreen";
import AboutScreen from "./components/AboutScreen";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={HomeScreen} />

        <Route path="/login" component={LoginScreen} />

        <Route path="/about" component={AboutScreen} />

        <Redirect from="*" to="/home" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
