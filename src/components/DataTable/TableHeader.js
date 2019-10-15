import { Table } from 'semantic-ui-react';
import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

const TableHeader = (props) => {
  const { t } = useTranslation();
  const { columns, column, direction, handleSort } = props;

  return (
    <Table.Header>
      <Table.Row>
        {columns.map((item) => (
          <Table.HeaderCell
            key={item.property}
            width={item.width}
            sorted={column === item.property ? direction : null}
            onClick={() => handleSort(item.property)}
          >
            {t(item.title)}
          </Table.HeaderCell>
        ))}
      </Table.Row>
    </Table.Header>
  );
};

TableHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  column: PropTypes.string,
  direction: PropTypes.string,
  handleSort: PropTypes.func.isRequired,
};

TableHeader.defaultProps = {
  column: null,
  direction: null,
};

export default TableHeader;
