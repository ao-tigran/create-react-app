import React from 'react';
import { Responsive } from 'semantic-ui-react';
import styles from './index.module.scss';

const SiteWrapper = props => {
  return (
    <Responsive id={styles.page}>
      <div className={styles.page_content}>{props.children}</div>
    </Responsive>
  );
};

export default SiteWrapper;
