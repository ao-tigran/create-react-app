import React, { useContext } from 'react';
import AuthContext from './../../context/AuthContext';
import { useTranslation } from 'react-i18next';

const HomeScreen = props => {
  const { t } = useTranslation();

  const { user, logout, isLoading, error } = useContext(AuthContext);

  if (isLoading) {
    return null;
  }

  return (
    <div style={{ textAlign: 'center', margin: '10px auto' }}>
      <h1>Home Screen</h1>
      <p>{user ? `Welcome ${user.username}` : 'Loading ...'}</p>
      <button onClick={logout}>{t('login.logout')}</button>
    </div>
  );
};

export default HomeScreen;
