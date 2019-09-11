import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUser } from './../../hooks/UseUser';

export const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  const { isAuthed } = useUser();
  return (
    <Route
      {...rest}
      render={props =>
        isAuthed ? <Component {...props} /> : <Redirect to={'/login'} />
      }
    />
  );
};

export const NotAuthenticatedRoute = ({ component: Component, ...rest }) => {
  const { isAuthed } = useUser();
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthed ? <Component {...props} /> : <Redirect to={'/home'} />
      }
    />
  );
};
