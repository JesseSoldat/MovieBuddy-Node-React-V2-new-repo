import React from "react";

import PrivateRoute from "../PrivateRoute";

import MovieDetails from "../../pages/details/MovieDetails";

const detailsRoutes = [
  <PrivateRoute
    key="moviedetails"
    path="/movie-details/:id"
    component={MovieDetails}
    exact
  />
];

export default detailsRoutes;
