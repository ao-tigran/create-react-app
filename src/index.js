import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./i18n";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import 'semantic-ui-css/semantic.min.css';
import "./index.scss";

ReactDOM.render(
  <Suspense fallback="loading">
    <Router>
      <App />
    </Router>
  </Suspense>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
