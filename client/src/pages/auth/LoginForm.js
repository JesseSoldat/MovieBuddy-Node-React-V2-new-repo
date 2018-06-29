import React, { Component } from "react";
import { connect } from "react-redux";

import TextInput from "../../components/inputs/TextInput";
import isEmail from "../../utils/isEmail";
import isEmpty from "../../utils/isEmpty";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    emailErr: null,
    passwordErr: null
  };

  isValid = (email, password) => {
    let isValid = true;
    let emailErr = null;
    let passwordErr = null;

    if (isEmpty(email) || isEmpty(password)) {
      isValid = false;

      if (isEmpty(email)) {
        emailErr = "The email field is required";
      }
      if (isEmpty(password)) {
        passwordErr = "The password field is required";
      }
    }

    if (!isEmpty(email) && !isEmail(email)) {
      isValid = false;
      emailErr = "The email is not valid";
    }

    this.setState({
      emailErr,
      passwordErr
    });

    return isValid;
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;

    if (!this.isValid(email, password)) {
      return;
    }

    this.props.handleSubmit(email, password);
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password, emailErr, passwordErr } = this.state;
    return (
      <form noValidate>
        <TextInput
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          onChange={this.onChange}
          value={email}
          error={emailErr}
        />
        <TextInput
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          onChange={this.onChange}
          value={password}
          error={passwordErr}
        />
        <button className="btn btn-primary mt-2" onClick={this.onSubmit}>
          Login
        </button>
      </form>
    );
  }
}

export default connect(null)(LoginForm);
