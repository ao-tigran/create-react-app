import React from 'react';
import PropTypes from 'prop-types';

const DigitInput = ({ value, onChange }) => {
  const isValid = (val) => {
    // Checks if val is empty or contains only digits
    const reg = /^(^$|\d+)$/;

    return val.match(reg);
  };

  const handleChange = (e) => {
    const val = e.target.value;

    if (isValid(val)) {
      onChange(val);
    }
  };

  return <input type="tel" value={value} onChange={(e) => handleChange(e)} />;
};

DigitInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
};

DigitInput.defaultProps = {
  value: '',
  onChange: () => {},
};
export default DigitInput;
