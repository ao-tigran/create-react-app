import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { AuthContext } from "./../../hooks/useAuth";

class AuthenticationRoute extends Route {
  isValidRouting = isAuthed => {
    /** withAuth can take false/true/undefined
     * false - means that you can enter the route only if you are not authenticated
     * true - means that you can enter the route only if you are authenticated
     * undefined - create auth insensitive route, meaning that you can enter it in any case
     */
    const { withAuth } = this.props;

    if (withAuth === undefined) {
      return true;
    }

    return withAuth ? isAuthed : !isAuthed;
  };

  resolveRedirectPath = () => {
    const { redirectOnFailure, location } = this.props;

    if (redirectOnFailure) {
      return redirectOnFailure;
    }

    // Redirect to the route, the user tried to access
    // right before authentication
    return location.state ? location.state.from : "/home";
  }

  render() {
    const { location } = this.props;
    const redirectOnFailure = this.resolveRedirectPath();

    return (
      <AuthContext.Consumer>
        {({ isAuthed }) => {
          return this.isValidRouting(isAuthed) ? (
            super.render()
          ) : (
            <Redirect
              to={{
                pathname: redirectOnFailure,
                state: { from: location.pathname }
              }}
            />
          );
        }}
      </AuthContext.Consumer>
    );
  }
}

export default withRouter(AuthenticationRoute);
