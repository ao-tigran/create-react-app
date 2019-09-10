import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../../helpers/auth';

class AuthenticationRoute extends Route {
  isValidRouting = () => {
    const { withAuth } = this.props;

    const isAuth = isAuthenticated();

    return withAuth ? isAuth : !isAuth;
  };

  render() {
    return this.isValidRouting() ? (
      super.render()
    ) : (
      <Redirect to={this.props.redirectOnFailure} />
    );
  }
}

export default AuthenticationRoute;
