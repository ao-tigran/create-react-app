import React from 'react';
import { Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const CustomInput = (props) => {
  const { icon } = props;
  return (
    <Input
      iconPosition="left"
      icon={icon}
    />
  );
};

CustomInput.propTypes = {
  icon: PropTypes.oneOf(PropTypes.bool || PropTypes.element),
};
CustomInput.defaultProps = {
  icon: false,
};

export default CustomInput;
