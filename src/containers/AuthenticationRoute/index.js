import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

class AuthenticationRoute extends Route {
  isValidRouting = () => {
    const { withAuth, isAuthenticated } = this.props;

    // withAuth can take false/true/undefined
    // false - means that you can enter the route only if you are not authenticated
    // true - means that you can enter the route only if you are authenticated
    // undefined - create auth insensitive route, measning that you can enter it in any case
    if (withAuth === undefined) {
      return true;
    }

    return withAuth ? isAuthenticated : !isAuthenticated;
  };

  render() {
    return this.isValidRouting() ? (
      super.render()
    ) : (
      <Redirect to={this.props.redirectOnFailure} />
    );
  }
}

export default withRouter(AuthenticationRoute);
