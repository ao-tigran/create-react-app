import React from "react";
import { withRouter } from "react-router";
import styles from "./index.module.scss";

const LoginScreen = props => {
  const handleFormSubmit = event => {
    event.preventDefault();
  };

  return (
    <div id={styles.login_screen}>
      <div className={styles.login_body}>
        <form onSubmit={handleFormSubmit}>
          <div className={styles.login_input}>
            <label htmlFor="username" className={styles.login_label}>
              Login
            </label>
            <input name="username" type="text" autoComplete="off" />
          </div>

          <div className={styles.login_input}>
            <label htmlFor="password" className={styles.login_label}>
              Password
            </label>
            <input name="password" type="password" autoComplete="off" />
          </div>
          <div className={styles.login_submit}>
            <button type="submit" value="Submit">
              <p>Submit</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(LoginScreen);
