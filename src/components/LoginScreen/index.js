import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import styles from './index.module.scss';

const LoginScreen = () => {
  const { authenticate } = useAuth();
  const { t } = useTranslation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (event) => {
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

export default LoginScreen;
