import React, { useState } from 'react';

import { useUser } from './../../hooks/UseUser';

import { withRouter } from 'react-router';

import { Form, Button, Input } from 'semantic-ui-react';
import styles from './index.module.scss';

const LoginScreen = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { authenticate } = useUser();

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    //TO DO - VALIDATE username and password
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
              iconPosition="left"
              placeholder="Login name"
              onChange={handleUsernameChange}
            />
          </div>

          <div className={styles.login_input}>
            <label htmlFor="password" className={styles.login_label}>
              Password
            </label>
            <Input
              name="password"
              type="password"
              iconPosition="left"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
          </div>
          <div className={styles.login_submit}>
            <Button type="submit" value="Submit" className={styles.login_btn}>
              Log in
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default withRouter(LoginScreen);
