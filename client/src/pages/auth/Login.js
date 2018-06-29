import React from "react";
import { connect } from "react-redux";

import LoginForm from "./LoginForm";
import { startLogin } from "../../actions/auth";

const Login = ({ startLogin }) => {
  const handleSubmit = (email, password) => {
    startLogin(email, password);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-md-8 mx-auto">
          <h1 className="text-center mb-3 mt-3 display-4">Login</h1>
          <LoginForm handleSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default connect(
  null,
  { startLogin }
)(Login);
