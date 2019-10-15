import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Table as SemanticTable,
  Pagination,
  Button,
  Icon,
} from 'semantic-ui-react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import PageSizeSelect from './PageSizeSelect';
import TableHeader from './TableHeader';
import styles from './table.module.scss';

import 'semantic-ui-css/semantic.min.css';

const Table = (props) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    currentPage,
    direction,
    data,
    columns,
    limit,
    onChangeLimit,
    totalCount,
    column,
    handleSort,
    totalPages,
    onChangePage,
  } = props;

  useEffect(() => {
    setExpanded([]);
  }, [currentPage, direction]);

  if (!data) {
    return <></>;
  }

  let currentDirection = null;

  if (direction === 'asc') {
    currentDirection = 'ascending';
  }
  if (direction === 'desc') {
    currentDirection = 'descending';
  }

  const rows = data.map((item) => (
    <SemanticTable.Row key={item.id}>
      {columns.map((dataColumn, i) => {
        const cls = classnames({
          'not-bold': i === 0,
          'angle down icon': i !== 0 && !expanded.includes(item.id),
          'hidden-cell': i !== 0 && !expanded.includes(item.id),
        });
        const btn = classnames({
          'angle right icon': !expanded.includes(item.id),
          'angle down icon': expanded.includes(item.id),
        });

        return (
          <SemanticTable.Cell className={cls} key={dataColumn.id}>
            <p className={styles.expandTitle}>{t(dataColumn.title)}</p>
            {i === 0 && (
              <Button
                className="expand-btn"
                onClick={() => {
                  if (expanded.includes(item.id)) {
                    setExpanded(expanded.filter((e) => e !== item.id));
                  } else {
                    setExpanded([...expanded, item.id]);
                  }
                  setIsExpanded(!isExpanded);
                }}
              >
                <Icon className={btn} size="large" />
              </Button>
            )}

            <p className={isExpanded ? styles.expandProperty : styles.noMargin}>
              {item[dataColumn.property]}
            </p>
          </SemanticTable.Cell>
        );
      })}
    </SemanticTable.Row>
  ));

  return (
    <>
      <PageSizeSelect limit={+limit} onChangeLimit={onChangeLimit} />
      Total count:
      {' '}
      {totalCount}
.
      <SemanticTable celled selectable sortable>
        <TableHeader
          columns={columns}
          column={column}
          direction={currentDirection}
          handleSort={handleSort}
        />

        <SemanticTable.Body>{rows}</SemanticTable.Body>

        <SemanticTable.Footer>
          <SemanticTable.Row>
            <SemanticTable.HeaderCell colSpan="8">
              <Pagination
                totalPages={totalPages}
                activePage={currentPage}
                onPageChange={onChangePage}
              />
            </SemanticTable.HeaderCell>
          </SemanticTable.Row>
        </SemanticTable.Footer>
      </SemanticTable>
    </>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalCount: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeLimit: PropTypes.func.isRequired,
  limit: PropTypes.number.isRequired,
  direction: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  column: PropTypes.string,
  handleSort: PropTypes.func.isRequired,
};

Table.defaultProps = {
  direction: PropTypes.oneOf(['esc', 'desc']),
  column: null,
};

export default Table;
