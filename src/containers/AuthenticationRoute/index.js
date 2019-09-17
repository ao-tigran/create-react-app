import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

class AuthenticationRoute extends Route {
  isValidRouting = () => {
    const { withAuth, isAuthenticated } = this.props;

    if (withAuth === undefined) {
      return true;
    }

    return withAuth ? isAuthenticated : !isAuthenticated;
  };

  componentDidUpdate(prevProps) {
    const { history, isAuthenticated, redirectOnFailure } = this.props;

    if (!prevProps.isAuthenticated && isAuthenticated) {
      history.push(redirectOnFailure);
    }
  }

  render() {
    return this.isValidRouting() ? (
      super.render()
    ) : (
      <Redirect to={this.props.redirectOnFailure} />
    );
  }
}

export default withRouter(AuthenticationRoute);
