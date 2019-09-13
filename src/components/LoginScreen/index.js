import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { useAuth } from './../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';

const LoginScreen = props => {
  const { t } = useTranslation();

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

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
              {t('login.username')}
            </label>
            <input
              name="username"
              type="text"
              onChange={handleUsernameChange}
              autoComplete="off"
            />
          </div>

          <div className={styles.login_input}>
            <label htmlFor="password" className={styles.login_label}>
              {t('login.password')}
            </label>
            <input
              name="password"
              type="password"
              onChange={handlePasswordChange}
              autoComplete="off"
            />
          </div>
          <div className={styles.login_submit}>
            <button type="submit" value="Submit">
              <p>{t('login.login')}</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(LoginScreen);
