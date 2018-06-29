import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import Navbar from "../components/NavBar";

const PrivateRoute = ({ isAuth, component: Component, ...rest }) => (
  <Route
    {...rest}
    component={props =>
      isAuth ? (
        <div>
          <Navbar />
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const mapStateToProps = ({ auth }) => ({
  isAuth: !!auth._id
});

export default connect(mapStateToProps)(PrivateRoute);
