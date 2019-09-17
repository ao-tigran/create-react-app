import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import AuthContext from "./../../context/AuthContext";

class AuthenticationRoute extends Route {
  // Assign a contextType to get isAuthed from AuthContext
  static contextType = AuthContext;

  isValidRouting = () => {
    /** withAuth can take false/true/undefined
     * false - means that you can enter the route only if you are not authenticated
     * true - means that you can enter the route only if you are authenticated
     * undefined - create auth insensitive route, meaning that you can enter it in any case
     */
    const { withAuth } = this.props;

    if (withAuth === undefined) {
      return true;
    }

    const { isAuthed } = this.context;

    return withAuth ? isAuthed : !isAuthed;
  };

  render() {
    const { redirectOnFailure, location } = this.props;

    return this.isValidRouting() ? (
      super.render()
    ) : (
      <Redirect
        to={{
          pathname: redirectOnFailure,
          state: { from: location.pathname }
        }}
      />
    );
  }
}

export default withRouter(AuthenticationRoute);
