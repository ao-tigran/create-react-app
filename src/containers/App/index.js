import React, { useState, useEffect } from 'react';
import logo from '../../styles/svgs/logo.svg';
import { useTranslation } from 'react-i18next';
import LanguageContainer from '../../components/LanguageContainer';
import GlobalError from '../../components/GlobalError';
import GlobalErrContext from '../../context/GlobalErrContext';

import styles from './index.module.scss';

function App() {
  const [globalError, setGlobalError] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    setGlobalError({msg: 'Global error message'});
  }, []);

  return (
    <GlobalErrContext.Provider value={[
      globalError,
      setGlobalError
    ]}>
      <div className={styles.app}>
        <header className={styles.app_header}>

          <GlobalError />

          <img src={logo} className={styles.app_logo} alt="logo" />
          <p>{t('login.username')}</p>
          <LanguageContainer />
        </header>
      </div>
    </GlobalErrContext.Provider>
  );
}

export default App;
