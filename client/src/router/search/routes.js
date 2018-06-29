import React from "react";

import PrivateRoute from "../PrivateRoute";
import Search from "../../pages/search/Search";

const searchRoutes = [
  <PrivateRoute key="search" path="/search" component={Search} />
];

export default searchRoutes;
