import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Segment, Loader, Dimmer, Image } from 'semantic-ui-react';

import axios from 'axios';
import Table from './Table';
import styles from './table.module.scss';

const DataTable = (props) => {
  const { dataSource, columns, currentPage, paginated, limit } = props;
  const isServer = typeof dataSource === 'string';
  const [data, setData] = useState(isServer ? [] : dataSource);
  const [sort, setSort] = useState();
  const [page, setPage] = useState(currentPage);
  const isPaginated = paginated;
  const [order, setOrder] = useState(null);
  const [limitSize, setLimitSize] = useState(limit);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSort = (clickedColumn) => {
    let newOrder = order === 'asc' ? 'desc' : 'asc';

    if (sort !== clickedColumn) {
      newOrder = 'asc';
    }

    setSort(clickedColumn);
    setOrder(newOrder);
  };

  const onChangeLimit = (event, eventData) => setLimitSize(eventData.value);

  const onChangePage = (event, eventData) => setPage(eventData.activePage);

  useEffect(() => {
    if (isServer) {
      setLoading(true);

      const requestParams = {};

      if (sort) {
        requestParams.order = order;
        requestParams.sortBy = sort;
      }

      if (isPaginated) {
        requestParams.page = page;
        requestParams.limit = limitSize;
      }

      axios
        .get(dataSource, { params: requestParams })
        .then((response) => {
          setTotalCount(50); // total count should be included in metadata of the response
          setLoading(false);
          setData(response.data);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  }, [sort, page, order, limitSize, dataSource, isPaginated, isServer]);

  return (
    <Segment className={styles.dataTableContainer}>
      {loading && (
        <Segment className={styles.loaderWrapper}>
          <Dimmer active inverted>
            <Loader className={styles.loader}>Loading</Loader>
          </Dimmer>

          <Image
            src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
            className={styles.loaderImg}
          />
        </Segment>
      )}
      <Table
        columns={columns}
        data={data}
        totalCount={totalCount}
        totalPages={Math.ceil(totalCount / limitSize)}
        currentPage={page}
        onChangePage={onChangePage}
        column={sort}
        direction={order}
        handleSort={handleSort}
        onChangeLimit={onChangeLimit}
        limit={+limitSize}
      />
    </Segment>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataSource: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf])
    .isRequired,
  currentPage: PropTypes.number,
  paginated: PropTypes.bool,
  limit: PropTypes.number,
};

DataTable.defaultProps = {
  currentPage: 1,
  paginated: true,
  limit: 10,
};

export default DataTable;
