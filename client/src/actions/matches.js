import axios from "axios";

import errMessage from "./utils/errMessage";

export const ALL_MATCHES = "ALL_MATCHES";
export const SINGLE_USER_MATCHES = "SINGLE_USER_MATCHES";
export const MATCHES_LOADING = "MATCHES_LOADING";
export const MATCHES_ERR = "MATCHES_ERR";

export const getMatches = matches => ({
  type: ALL_MATCHES,
  matches,
  loading: false,
  error: null
});

export const startGetMatches = () => async dispatch => {
  dispatch({ type: MATCHES_LOADING, loading: true });

  try {
    const res = await axios.get("/api/matches/movies");
    dispatch(getMatches(res.data));
  } catch (err) {
    dispatch({ type: MATCHES_ERR, error: errMessage("get", "matches") });
  }
};

export const getSingleUserMatches = singleUserMatches => ({
  type: SINGLE_USER_MATCHES,
  singleUserMatches,
  loading: false,
  error: null
});

export const startGetSingleUserMatches = matchedUserId => async dispatch => {
  dispatch({ type: MATCHES_LOADING, loading: true });
  try {
    const res = await axios.get(`/api/matches/movies/${matchedUserId}`);
    dispatch(getSingleUserMatches(res.data));
  } catch (err) {
    dispatch({
      type: MATCHES_ERR,
      error: errMessage("get", "single user matches")
    });
  }
};
