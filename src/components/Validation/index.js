import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import i18n from '../../i18n';
import styles from './index.module.scss';

const Validation = ({ children, errors, name, showMessage }) => (
  <>
    {React.Children.map(children, (child) => React.cloneElement(child, {
      className: classnames(child.props.className, {
        [styles.invalid]: errors[name],
      }),
      name,
    }))}
    {errors[name] && showMessage && <div>{i18n.t(errors[name].message)}</div>}
  </>
);

Validation.propTypes = {
  children: PropTypes.element.isRequired,
  name: PropTypes.string,
  errors: PropTypes.shape({}),
  showMessage: PropTypes.bool,
};

Validation.defaultProps = {
  name: '',
  errors: {},
  showMessage: true,
};

export default Validation;
