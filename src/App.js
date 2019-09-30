import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import AuthenticationRoute from "./containers/AuthenticationRoute";
import routes from "./helpers/routes";
import LoginScreen from "./components/LoginScreen";
import Currency from "./components/Currency";

const App = () => {
  return (
    <Switch>
      {/* ============== START OF auth insensitive routes ============== */}
      <Route
        path="/currency"
        component={() => (
          <Currency
            value="1500015646"
            withCurrencyLabel={true}
            withSymbol={true}
            currency=""
            fractionDigits="3"
          />
        )}
      />
      {/* ============== END OF auth insensitive routes ================ */}

      {/* ============== START OF non auth routes ====================== */}
      <AuthenticationRoute
        path="/login"
        withAuth={false}
        component={LoginScreen}
      />
      {/* ============== END OF non auth routes ========================= */}

      {/* ============== START OF auth routes =========================== */}
      <AuthenticationRoute
        path="/"
        withAuth={false}
        redirectOnFailure="/login"
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

export default App;
