import React from "react";

const DigitInput = ({ value, onChange, ...rest }) => {
  const isValid = val => {
    //Checks if val is empty or contains only digits
    const reg = /^(^$|\d+)$/;

    return val.match(reg);
  };

  const handleChange = e => {
    const val = e.target.value;

    if (isValid(val)) {
      onChange(val);
    }
  };

  return (
    <input type="tel" value={value} onChange={e => handleChange(e)} {...rest} />
  );
};

export default DigitInput;
