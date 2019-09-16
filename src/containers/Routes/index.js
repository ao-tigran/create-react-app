import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './../../hooks/useAuth';

export const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  const { isAuthed } = useAuth();
  return (
    <Route
      {...rest}
      render={props =>
        isAuthed ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export const NotAuthenticatedRoute = ({ component: Component, ...rest }) => {
  const { isAuthed } = useAuth();
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthed ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={
              (props.location.state && props.location.state.from) || {
                from: { pathname: '/home' },
              }
            }
          />
        )
      }
    />
  );
};
