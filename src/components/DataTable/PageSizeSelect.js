import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

const PageSizeSelect = (props) => {
  const { options, limit, onChangeLimit } = props;
  return (
    <div>
      Records per page:
      <Dropdown
        inline
        options={options}
        defaultValue={limit}
        onChange={onChangeLimit}
      />
    </div>
  );
};

PageSizeSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  // defaultValue: PropTypes.number,
  onChangeLimit: PropTypes.func.isRequired,
  limit: PropTypes.number.isRequired,
};

PageSizeSelect.defaultProps = {
  options: [
    { key: '0', value: '10', text: '10' },
    { key: '1', value: '25', text: '25' },
    { key: '2', value: '50', text: '50' },
    { key: '3', value: '100', text: '100' },
  ],
  // defaultValue: 10,
};

export default PageSizeSelect;
