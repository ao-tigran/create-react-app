import React from "react";
import HomeScreen from "../../components/HomeScreen";
import DataTable from "../../components/DataTable";

const routes = [
  {
    path: "/home",
    component: HomeScreen
  },
  {
    path: "/private",
    component: () => <h3>Private screen</h3>
  },
  {
    path: "/datatable",
    component: DataTable
  }
];

export default routes;
