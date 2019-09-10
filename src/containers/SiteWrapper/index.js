import React, { Component } from 'react';
import LoaderOverlay from '../LoaderOverlay';

import AuthContext from './../../context/AuthContext';

import { Responsive } from 'semantic-ui-react';
import styles from './index.module.scss';

class SiteWrapper extends Component {
  static contextType = AuthContext;

  render() {
    const { loading } = this.context;

    return (
      <Responsive id={styles.page}>
        <div className={styles.page_content}>
          <LoaderOverlay active={loading}>{this.props.children}</LoaderOverlay>
        </div>
      </Responsive>
    );
  }
}

export default SiteWrapper;
