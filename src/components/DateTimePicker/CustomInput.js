import React from 'react';
import { Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import 'semantic-ui-css/semantic.min.css';

const CustomInput = props => {
  const { icon, ...rest } = props;
  return <Input iconPosition="left" icon={icon} {...rest} />;
};

CustomInput.propTypes = {
  icon: PropTypes.oneOf(PropTypes.bool || PropTypes.element),
};
CustomInput.defaultProps = {
  icon: false,
};

export default CustomInput;
