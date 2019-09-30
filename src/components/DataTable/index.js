import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";
import DataTableModule from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";

const DataTable = () => {
  const { t } = useTranslation();
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterName, setFilterName] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterPhone, setFilterPhone] = useState("");

  useEffect(() => {
    async function fetchInitialData() {
      let response = await fetch("https://jsonplaceholder.typicode.com/users");
      let json = await response.json();
      setTableData(json);
      setLoading(false);
    }
    fetchInitialData();
  }, []);

  // Controllers to be created in backend
  useEffect(() => {
    async function filtereByName() {
      let response = await fetch("https://jsonplaceholder.typicode.com/users"); 
      let json = await response.json();
      let filtered = json.filter(user => user.name.includes(filterName)); 
      filterName && setTableData(filtered);
    }
    filtereByName();
  }, [filterName]);

  useEffect(() => {
    async function filtereByEmail() {
      let response = await fetch("https://jsonplaceholder.typicode.com/users");
      let json = await response.json();
      let filtered = json.filter(user => user.email.includes(filterEmail));
      filterEmail && setTableData(filtered);
    }
    filtereByEmail();
  }, [filterEmail]);

  useEffect(() => {
    async function filtereByPhone() {
      let response = await fetch("https://jsonplaceholder.typicode.com/users");
      let json = await response.json();
      let filtered = json.filter(user => user.phone.includes(filterPhone));
      filterPhone && setTableData(filtered);
    }
    filtereByPhone();
  }, [filterPhone]);

  const columns = [
    {
      name: "Full Name",
      selector: "name",
      sortable: true,
      center: "true"
    },
    {
      name: "E-mail",
      selector: "email",
      sortable: true,
      center: "true",
      hide: "sm"
    },
    {
      name: "Phone",
      selector: "phone",
      sortable: true,
      hide: "md",
      center: "true"
    }
  ];

  const myTheme = {
    title: {
      fontSize: "1.5rem",
      fontColor: "#3c3938",
      backgroundColor: "#fff"
    },
    header: {
      fontSize: "0.8rem",
      fontWeight: "500",
      fontColorActive: "#605e5d",
      fontColor: "#3c3938",
      backgroundColor: "#fff",
      textAlign: "center"
    },
    rows: {
      fontColor: "#605e5d",
      backgroundColor: "#fff",
      stripedColor: "#f9f9f9"
    },
    pagination: {
      backgroundColor: "#fff",
      buttonFontColor: "#605e5d",
      fontColor: "#605e5d"
    }
  };

  //Pagination
  // In order to enable internal pagination and disable server-side pagination -> remove paginationServer prop in <DataTable/>
  const paginationOptions = {
    rowsPerPageText: t("table-pagination.rowsPerPage"),
    rangeSeparatorText: t("table-pagination.of")
  };
  const rowsPerPage = 10;
  const rowsPerPageOptions = [10, 15, 20, 25, 30];
  const totalRows = 20;

  const handlePageChange = (page, totalRows) => {
    setLoading(true);
    // Controller to be created in backend
    fetch(
      `https://jsonplaceholder.typicode.com/users?page=${page}&per_page=${totalRows}`
    )
      .then(res => res.json())
      .then(res => {
        setTableData(res);
        setLoading(false);
      });
  };

  const handlePerRowsChange = (currentRowsPerPage, currentPage) => {
    setLoading(true);
    //Controller to be created in backend
    fetch(
      `https://jsonplaceholder.typicode.com/users?page=${currentPage}&per_page=${currentRowsPerPage}`
    )
      .then(res => res.json())
      .then(res => {
        setTableData(res);
        setLoading(false);
      });
  };

  // Filtering

  const FilterByName = ({ onFilter }) => (
    <input
      id="searchName"
      className={styles.filter_input}
      type="search"
      role="search"
      placeholder="Search Name"
      onChange={e => onFilter(e.target.value)}
    />
  );
  const FilterByEmail = ({ onFilter }) => (
    <input
      id="searchEmail"
      className={styles.filter_input}
      type="search"
      role="search"
      placeholder="Search Email"
      onChange={e => onFilter(e.target.value)}
    />
  );
  const FilterByPhone = ({ onFilter }) => (
    <input
      id="searchPhone"
      className={styles.filter_input}
      type="search"
      role="search"
      placeholder="Search Phone Number"
      onChange={e => onFilter(e.target.value)}
    />
  );


  const subHeaderFilterName = useMemo(
    () => <FilterByName onFilter={value => setFilterName(value)} />,
    []
  );
  const subHeaderFilterEmail = useMemo(
    () => <FilterByEmail onFilter={value => setFilterEmail(value)} />,
    []
  );
  const subHeaderFilterPhone = useMemo(
    () => <FilterByPhone onFilter={value => setFilterPhone(value)} />,
    []
  );


  const subHeaderComponentMemos = [
    subHeaderFilterName,
    subHeaderFilterEmail,
    subHeaderFilterPhone
  ];

  //Sorting
  const sortIcon = (
    <FontAwesomeIcon icon={faSortDown} className={styles.sort_icon} />
  );

  // In order to disable internal sorting and enable server-side sorting -> uncomment sortServer prop in <DataTable/>

  // SERVER SIDE SORTING
  const handleSort = (column, sortDirection) => {
    setLoading(true);
    let api = "";

    // To be created in backend, jsonplaceholder doesn't support this kind of controllers
    sortDirection === "asc"
      ? (api = `https://jsonplaceholder.typicode.com/users?order=${column.selector}`)
      : (api = `https://jsonplaceholder.typicode.com/users?order=-${column.selector}`);

    fetch(api)
      .then(res => res.json())
      .then(res => {
        setTableData(res);
        setLoading(false);
      });
  };

  return (

    <div id={styles.data_table}>

      <DataTableModule
        title="Users' Table"
        columns={columns}
        data={tableData}
        customTheme={myTheme}
        striped
        highlightOnHover
        responsive
        sortIcon={sortIcon}
        onSort={handleSort}
        //sortServer
        //sortFunction={customSort}
        pagination
        paginationServer
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
        paginationPerPage={rowsPerPage}
        paginationRowsPerPageOptions={rowsPerPageOptions}
        paginationComponentOptions={paginationOptions}
        paginationTotalRows={totalRows}
        progressPending={loading}
        subHeader
        subHeaderComponent={subHeaderComponentMemos}
        subHeaderAlign="center"
        style={{
            margin: "5rem auto 0",
            overflow: "hidden",
            maxWidth: "64rem"
        }}
      />
      </div>

  );
};

export default DataTable;
