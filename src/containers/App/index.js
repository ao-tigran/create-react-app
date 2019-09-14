import React from 'react';
import logo from '../../styles/svgs/logo.svg';
import { useTranslation } from 'react-i18next';
import LanguageContainer from '../../components/LanguageContainer';

import styles from './index.module.scss';

function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.app}>
      <header className={styles.app_header}>
        <img src={logo} className={styles.app_logo} alt="logo" />
        <p>{t('login.username')}</p>
        <LanguageContainer />
      </header>
    </div>
  );
}

export default App;
