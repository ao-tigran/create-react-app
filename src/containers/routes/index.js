import React from "react";
import { Route, Redirect } from "react-router-dom";

export const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  const { isAuthed } = rest;

  return (
    <Route
      {...rest}
      render={props =>
        isAuthed ? <Component {...props} /> : <Redirect to={"/login"} />
      }
    />
  );
};

export const NotAuthenticatedRoute = ({ component: Component, ...rest }) => {
  const { isAuthed } = rest;
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthed ? <Component {...props} /> : <Redirect to={"/home"} />
      }
    />
  );
};
