import React, { useContext } from 'react';
import GlobalErrContext from '../../context/GlobalErrContext';
import styles from './index.module.scss';

const GlobalError = () => {
  const [globalError,  setGlobalError] = useContext(GlobalErrContext);

  const handleErrorClose = () => setGlobalError(null);

  if (!globalError) {
    return null;
  }

  return (
    <div className={styles.error_block}>
      <span className={styles.error_msg}>{globalError.msg}</span>
      <button className={styles.close_button} onClick={handleErrorClose}>X</button>
    </div>
  )
}

export default GlobalError;