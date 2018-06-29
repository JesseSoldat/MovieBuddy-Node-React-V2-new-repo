import React from "react";

import PrivateRoute from "../PrivateRoute";

import Favorites from "../../pages/favorites/favorites";

const favoritesRoutes = [
  <PrivateRoute key="favorites" path="/favorites" component={Favorites} exact />
];

export default favoritesRoutes;
