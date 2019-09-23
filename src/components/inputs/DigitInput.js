import React from "react";

const DigitInput = ({ value, setValue, withPeriod = false, ...rest }) => {
  const isValid = (reg, val) => {
    return val.match(reg);
  };

  const handleChange = e => {
    const val = e.target.value;

    //allows to delete first char
    if (val.length === 0) {
      return setValue("");
    }

    const reg = withPeriod ? /^[0-9]+\.?[0-9]*$/ : /^\d+$/;

    return isValid(reg, val) && setValue(val);
  };

  return (
    <input type="tel" value={value} onChange={e => handleChange(e)} {...rest} />
  );
};

export default DigitInput;
