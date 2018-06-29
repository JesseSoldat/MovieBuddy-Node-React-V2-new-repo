import React from "react";

import PrivateRoute from "../PrivateRoute";
import Matches from "../../pages/matches/Matches";

const matchesRoutes = [
  <PrivateRoute key="matches" path="/matches" component={Matches} exact />
];

export default matchesRoutes;
