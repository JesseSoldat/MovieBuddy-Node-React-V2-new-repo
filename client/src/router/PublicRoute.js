import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import NavBar from "../components/NavBar";

const PublicRoute = ({ isAuth, component: Component, ...rest }) => (
  <Route
    {...rest}
    component={props =>
      isAuth ? (
        <Redirect to="/dashboard" />
      ) : (
        <div>
          <NavBar />
          <Component {...props} />
        </div>
      )
    }
  />
);

const mapStateToProps = ({ auth }) => ({
  isAuth: !!auth._id
});

export default connect(mapStateToProps)(PublicRoute);
