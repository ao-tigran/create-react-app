import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { useAuth } from './../../hooks/useAuth';
import styles from './index.module.scss';

const LoginScreen = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { authenticate } = useAuth();

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    authenticate({ username, password });
  };

  return (
    <div id={styles.login_screen}>
      <div className={styles.login_body}>
        <form onSubmit={handleFormSubmit}>
          <div className={styles.login_input}>
            <label htmlFor="username" className={styles.login_label}>
              Login
            </label>
            <input
              name="username"
              type="text"
              onChange={handleUsernameChange}
            />
          </div>

          <div className={styles.login_input}>
            <label htmlFor="password" className={styles.login_label}>
              Password
            </label>
            <input
              name="password"
              type="password"
              onChange={handlePasswordChange}
            />
          </div>
          <div className={styles.login_submit}>
            <button type="submit" value="Submit">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(LoginScreen);
