import { ALL_MATCHES, MATCHES_LOADING, MATCHES_ERR } from "../actions/matches";

const initialState = {
  matches: [],
  loading: true,
  error: null
};

export default (state = initialState, action) => {
  const { type, matches, loading, error } = action;

  switch (type) {
    case MATCHES_LOADING:
      return { ...state, loading };

    case MATCHES_ERR:
      console.log("MATCHES_ERR", error);
      return { ...state, loading: false, error };

    case ALL_MATCHES:
      console.log("ALL_MATCHES", matches);

      return { ...state, matches, loading, error };

    default:
      return { ...state };
  }
};
