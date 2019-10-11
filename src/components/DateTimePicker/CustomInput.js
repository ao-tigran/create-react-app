import React from 'react';
import { Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import 'semantic-ui-css/semantic.min.css';
/* eslint react/jsx-props-no-spreading: off */

const CustomInput = (props) => {
  const { inputRef, ...rest } = props;
  return <Input ref={inputRef} {...rest} />;
};

CustomInput.propTypes = {
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};
CustomInput.defaultProps = {
  inputRef: null,
};

export default CustomInput;
