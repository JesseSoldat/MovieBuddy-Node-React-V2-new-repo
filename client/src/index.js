import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./store";
import AppRouter from "./router/AppRouter";
import { LOGIN } from "./actions/auth";
import setAxiosHeader from "./utils/setAxiosHeader";

import "./index.css";

const Loading = () => <h1>Loading....</h1>;
const root = document.getElementById("root");
const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
let hasRenderedOnce = false;
const renderApp = () => {
  if (!hasRenderedOnce) {
    ReactDOM.render(app, root);
    hasRenderedOnce = true;
  }
};

ReactDOM.render(<Loading />, root);

const user = JSON.parse(localStorage.getItem("user"));

if (user) {
  const { username, _id, token } = user;
  store.dispatch({
    type: LOGIN,
    username,
    _id,
    token
  });
  // console.log("user: ", user);
  setAxiosHeader(token);
  renderApp();
} else {
  // no user
  setAxiosHeader(null);
  renderApp();
}
