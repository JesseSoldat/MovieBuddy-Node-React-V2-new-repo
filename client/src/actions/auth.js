import axios from "axios";

import errMessage from "./utils/errMessage";
import setAxiosHeader from "../utils/setAxiosHeader";

export const REGISTER = "REGISTER";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const AUTH_ERR = "AUTH_ERR";

export const register = (username, _id, token) => ({
  type: REGISTER,
  username,
  _id,
  token
});

export const startRegister = (username, email, password) => async dispatch => {
  const user = { username, email, password };
  try {
    const res = await axios.post("auth/register", user);
    const { username, _id, tokens } = res.data;
    const { token } = tokens[tokens.length - 1];
    setAxiosHeader(token);
    localStorage.setItem("user", JSON.stringify({ username, _id, token }));
    dispatch(register(username, _id, token));
  } catch (err) {
    dispatch({ type: AUTH_ERR, error: errMessage("register", "user") });
  }
};

export const login = (username, _id, token) => ({
  type: LOGIN,
  username,
  _id,
  token
});

export const startLogin = (email, password) => async dispatch => {
  const user = { email, password };
  try {
    const res = await axios.post("auth/login", user);
    const { username, _id, tokens } = res.data;
    const { token } = tokens[tokens.length - 1];
    setAxiosHeader(token);
    localStorage.setItem("user", JSON.stringify({ username, _id, token }));
    dispatch(login(username, _id, token));
  } catch (err) {
    dispatch({ type: AUTH_ERR, error: errMessage("login", "user") });
  }
};

export const logout = () => ({
  type: LOGOUT
});

export const startLogout = () => async dispatch => {
  try {
    await axios.delete("/auth/logout");
    setAxiosHeader(null);
    localStorage.removeItem("user");
    dispatch(logout());
  } catch (err) {
    console.log(err);

    dispatch({ type: AUTH_ERR, error: errMessage("logout", "user") });
  }
};
