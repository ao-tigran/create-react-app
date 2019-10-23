import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import AuthenticationRoute from './containers/AuthenticationRoute';
import routes from './helpers/routes';
import LoginScreen from './components/LoginScreen';
import Currency from './components/Currency';
import { GlobalErrProvider } from './hooks/useGlobalError';

const App = () => (
  <GlobalErrProvider>
    <Switch>
      {/* ============== START OF auth insensitive routes ============== */}
      <Route
        path="/currency"
        component={() => (
          <Currency
            value="150001564"
            withCurrencyLabel
            withSymbol
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
        withAuth
        redirectOnFailure="/login"
        render={() => (
          <Switch>
            {routes.map((route) => (
              <Route
                key={route.path}
                component={route.component}
                path={route.path}
              />
            ))}
            <Redirect to="/home" />
          </Switch>
        )}
      />

      {/* ============== END OF auth routes ============================= */}
    </Switch>
  </GlobalErrProvider>
);

export default App;
