import React from "react";

import PrivateRoute from "../PrivateRoute";
import Matches from "../../pages/matches/Matches";
import MatchedMovies from "../../pages/matches/MatchedMovies";

const matchesRoutes = [
  <PrivateRoute key="matches" path="/matches" component={Matches} exact />,
  <PrivateRoute
    key="matchedMovies"
    path="/matched-movies/:matchedUserId"
    component={MatchedMovies}
    exact
  />
];

export default matchesRoutes;
