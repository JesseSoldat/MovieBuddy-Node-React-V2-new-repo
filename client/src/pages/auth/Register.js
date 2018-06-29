import React from "react";
import { connect } from "react-redux";

import { startRegister } from "../../actions/auth";
import RegisterForm from "./RegisterForm";

const Register = ({ startRegister }) => {
  const handleSubmit = (username, email, password) => {
    startRegister(username, email, password);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-md-8 mx-auto">
          <h1 className="text-center mb-3 mt-3 display-4">Register</h1>
          <RegisterForm handleSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default connect(
  null,
  { startRegister }
)(Register);
