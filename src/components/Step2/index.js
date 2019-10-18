import React from 'react';
import PropTypes from 'prop-types';

const Step2 = ({ goPrevious, goNext }) => (
  <div>
      Content of Step 2

    <div>
      <button type="submit" onClick={goPrevious}>previous</button>
      <button type="submit" onClick={goNext}>next</button>
    </div>
  </div>
);

Step2.propTypes = {
  goNext: PropTypes.func,
  goPrevious: PropTypes.func,
};

Step2.defaultProps = {
  goNext: () => {},
  goPrevious: () => {},
};

export default Step2;
