import React from 'react';
import { useError } from '../../hooks/useGlobalError';
import styles from './index.module.scss';

const GlobalError = () => {
  const [globalError, setGlobalError] = useError();

  const handleErrorClose = () => setGlobalError(null);

  if (!globalError) {
    return null;
  }

  return (
    <div className={styles.error_block}>
      <span className={styles.error_msg}>{globalError}</span>
      <button className={styles.close_button} onClick={handleErrorClose} type="submit">X</button>
    </div>
  );
};

export default GlobalError;
