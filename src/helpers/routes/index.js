import HomeScreen from "../../components/HomeScreen";

import React from "react";
const routes = [
  {
    path: "/home",
    component: HomeScreen
  },
  {
    path: "/private",
    component: () => <h3>Private screen</h3>
  }
];

export default routes;
