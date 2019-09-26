import React from "react";
import { Switch, Redirect, Route, withRouter } from "react-router-dom";
import AuthenticationRoute from "./containers/AuthenticationRoute";
import routes from "./helpers/routes";
import LoginScreen from "./components/LoginScreen";
import Currency from "./components/Currency";

const App = props => {
  const isAuthenticated = false;
  const currencyValue = 1500015646.1568;
  const currencyType = "AMD";
  const currencyClass = {
    fontSize: '20px',
    margin: '20px'
  };

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
       <AuthenticationRoute
        path="/currency"
        withAuth={false}
        redirectOnFailure="/home"
        isAuthenticated={isAuthenticated}
        render={() => (<Route path='/currency' render={() => (
          <Currency value={currencyValue} showType={true} showSymbol={true} type={currencyType} currencyClass={currencyClass} />
        )}/>)}
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
