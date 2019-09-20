import React from "react";
import { Switch, Redirect, Route, withRouter } from "react-router-dom";
import AuthenticationRoute from "./containers/AuthenticationRoute";
import routes from "./helpers/routes";
import LoginScreen from "./components/LoginScreen";

const App = props => {
  const isAuthenticated = false;

  return (
    <Switch>
      {/* ============== START OF auth insensitive routes ============== */}

      {/* ============== END OF auth insensitive routes ================ */}

      {/* ============== START OF non auth routes ====================== */}
      <AuthenticationRoute
        path="/login"
        withAuth={false}
        component={LoginScreen}
        redirectOnFailure="/home"
        isAuthenticated={isAuthenticated}
      />
      {/* ============== END OF non auth routes ========================= */}

      {/* ============== START OF auth routes =========================== */}
      <AuthenticationRoute
        path="/"
        withAuth={true}
        redirectOnFailure="/login"
        isAuthenticated={isAuthenticated}
        render={() => (
          <Switch>
            {routes.map((route, index) => (
              <Route key={index} {...route} />
            ))}

            <Redirect to="/home" />
          </Switch>
        )}
      />
      {/* ============== END OF auth routes ============================= */}
    </Switch>
  );
};

export default withRouter(App);
