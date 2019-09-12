import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { useAuth } from './../../hooks/useAuth';
import { Form, Button, Input } from 'semantic-ui-react';
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
        <Form onSubmit={handleFormSubmit}>
          <div className={styles.login_input}>
            <label htmlFor="username" className={styles.login_label}>
              Login
            </label>
            <Input
              name="username"
              placeholder="Login name"
              onChange={handleUsernameChange}
              autoComplete="off"
            />
          </div>

          <div className={styles.login_input}>
            <label htmlFor="password" className={styles.login_label}>
              Password
            </label>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
              autoComplete="off"
            />
          </div>
          <div className={styles.login_submit}>
            <Button type="submit" value="Submit" content="Log In" primary />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default withRouter(LoginScreen);
