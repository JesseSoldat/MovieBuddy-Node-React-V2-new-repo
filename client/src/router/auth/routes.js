import React from "react";

import PublicRoute from "../PublicRoute";
import Register from "../../pages/auth/Register";
import Login from "../../pages/auth/Login";

const authRoutes = [
  <PublicRoute key="register" path="/register" component={Register} exact />,
  <PublicRoute key="login" path="/login" component={Login} exact />
];

export default authRoutes;
