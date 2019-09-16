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
    <div id={styles.private_screen}>
      <h1>Test Screen</h1>
      <p>{`Welcome ${user.username}`}</p>
      <button onClick={logout}>{t('login.logout')}</button>
    </div>
  );
};

export default HomeScreen;
