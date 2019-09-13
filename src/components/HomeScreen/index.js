import React, { useContext } from 'react';
import AuthContext from './../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';

const HomeScreen = props => {
  const { t } = useTranslation();

  const { user, logout, isLoading, error } = useContext(AuthContext);

  if (isLoading) {
    return null;
  }

  return (
    <div id={styles.home_screen}>
      <h1>Home Screen</h1>
      <p>{`Welcome ${user.username}`}</p>
      <button onClick={logout}>{t('login.logout')}</button>
    </div>
  );
};

export default HomeScreen;
