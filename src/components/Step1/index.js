import React from 'react';
import PropTypes from 'prop-types';

const Step1 = ({ goPrevious, goNext }) => (
  <div>
    Content of Step 1

    <div>
      <button type="submit" onClick={goPrevious}>previous</button>
      <button type="submit" onClick={goNext}>next</button>
    </div>
  </div>
);

Step1.propTypes = {
  goNext: PropTypes.func,
  goPrevious: PropTypes.func,
};

Step1.defaultProps = {
  goNext: () => {},
  goPrevious: () => {},
};

export default Step1;
