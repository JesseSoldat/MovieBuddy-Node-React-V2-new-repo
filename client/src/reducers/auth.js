import { REGISTER, LOGIN, LOGOUT, AUTH_ERR } from "../actions/auth";
const initialState = { username: null, _id: null, token: null, error: null };

export default (state = initialState, action) => {
  const { username, _id, token, error } = action;

  switch (action.type) {
    case AUTH_ERR:
      console.log("AUTH_ERR", error);
      return {
        ...state,
        error
      };

    case REGISTER:
      return {
        ...state,
        username,
        _id,
        token,
        error: null
      };

    case LOGIN:
      return {
        ...state,
        username,
        _id,
        token,
        error: null
      };

    case LOGOUT:
      return {
        ...state,
        username: null,
        _id: null,
        token: null,
        error: null
      };

    default:
      return state;
  }
};
