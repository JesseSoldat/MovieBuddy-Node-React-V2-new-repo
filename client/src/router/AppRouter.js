import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import authRoutes from "./auth/routes";
import generalRoutes from "./general/routes";
import searchRoutes from "./search/routes";
import favoritesRoutes from "./favorites/routes";
import detailsRoutes from "./details/routes";
import matchesRoutes from "./matches/route";
import NotFound from "../pages/general/NotFound";

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        {generalRoutes}
        {authRoutes}
        {searchRoutes}
        {favoritesRoutes}
        {detailsRoutes}
        {matchesRoutes}
        <Route key="notfound" component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
