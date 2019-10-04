import React from 'react';
import { Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const CustomInput = (props) => {
  const { icon, ...rest } = props;

  /* eslint react/jsx-props-no-spreading: off */
  return (
    <Input
      iconPosition="left"
      icon={icon}
      {...rest}
    />
  );
};

CustomInput.propTypes = {
  icon: PropTypes.oneOf([PropTypes.bool, PropTypes.element]),
};
CustomInput.defaultProps = {
  icon: null,
};

export default CustomInput;
