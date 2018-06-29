import React, { Component } from "react";
import { connect } from "react-redux";

import TextInput from "../../components/inputs/TextInput";
import isEmail from "../../utils/isEmail";
import isEmpty from "../../utils/isEmpty";
import isMatch from "../../utils/isMatch";

class RegisterForm extends Component {
  state = {
    username: "",
    email: "",
    password1: "",
    password2: "",
    usernameErr: null,
    emailErr: null,
    passwordErr: null,
    passMatchErr: null
  };

  isValid = (username, email, password1, password2) => {
    let isValid = true;
    let usernameErr = null;
    let emailErr = null;
    let passwordErr = null;
    let passMatchErr = null;

    if (isEmpty(username) || isEmpty(email) || isEmpty(password1)) {
      isValid = false;
      if (isEmpty(username)) {
        usernameErr = "The username field is required";
      }
      if (isEmpty(email)) {
        emailErr = "The email field is required";
      }
      if (isEmpty(password1)) {
        passwordErr = "The password field is required";
      }

      if (!isEmpty(email) && !isEmail(email)) {
        isValid = false;
        emailErr = "The email is not valid";
      }

      this.setState({ usernameErr, emailErr, passwordErr });
      return;
    }

    if (!isEmpty(email) && !isEmail(email)) {
      isValid = false;
      emailErr = "The email is not valid";
    }

    if (!isMatch(password1, password2)) {
      isValid = false;
      passMatchErr = "The passwords do not match";
    }

    this.setState({
      usernameErr,
      emailErr,
      passwordErr,
      passMatchErr
    });

    return isValid;
  };

  onSubmit = e => {
    e.preventDefault();
    const { username, email, password1, password2 } = this.state;

    if (!this.isValid(username, email, password1, password2)) {
      return;
    }

    this.props.handleSubmit(username, email, password1);
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      username,
      email,
      password1,
      password2,
      usernameErr,
      emailErr,
      passwordErr,
      passMatchErr
    } = this.state;
    return (
      <form noValidate>
        <TextInput
          label="Username"
          placeholder="Username"
          name="username"
          onChange={this.onChange}
          value={username}
          error={usernameErr}
        />
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
          name="password1"
          type="password"
          onChange={this.onChange}
          value={password1}
          error={passwordErr}
        />
        <TextInput
          label="Recomfirm Password"
          placeholder="Recomfirm Password"
          name="password2"
          type="password"
          onChange={this.onChange}
          value={password2}
          error={passMatchErr}
        />
        <button className="btn btn-primary mt-2" onClick={this.onSubmit}>
          Register
        </button>
      </form>
    );
  }
}

export default connect(null)(RegisterForm);
