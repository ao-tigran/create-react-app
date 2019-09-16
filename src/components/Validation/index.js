import React from 'react';
import classnames from 'classnames';

import styles from './index.module.scss';

const Validation = ({ children, errors, name }, showMessage) => {
  return (
    <>
      {React.Children.map(children, child => {
        return React.cloneElement(child, {
          className: classnames(child.props.className, {
            [styles.invalid]: errors[name],
          }),
          name: name,
        });
      })}
      {errors[name] && showMessage && (
        <div>
          {errors[name].message}
        </div>
      )}
    </>
  );
}

export default Validation;
