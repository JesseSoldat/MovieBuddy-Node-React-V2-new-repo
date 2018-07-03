import {
  ALL_MATCHES,
  SINGLE_USER_MATCHES,
  MATCHES_LOADING,
  MATCHES_ERR
} from "../actions/matches";

const initialState = {
  matches: {},
  singleUserMatches: [],
  loading: true,
  error: null
};

export default (state = initialState, action) => {
  const { type, matches, singleUserMatches, loading, error } = action;

  switch (type) {
    case MATCHES_LOADING:
      return { ...state, loading };

    case MATCHES_ERR:
      console.log("MATCHES_ERR", error);
      return { ...state, loading: false, error };

    case ALL_MATCHES:
      console.log("ALL_MATCHES", matches);
      return { ...state, matches, loading, error };

    case SINGLE_USER_MATCHES:
      console.log("SINGLE_USER_MATCHES", singleUserMatches);
      return { ...state, singleUserMatches, loading, error };

    default:
      return { ...state };
  }
};
