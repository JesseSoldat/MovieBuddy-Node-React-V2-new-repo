import axios from "axios";

import errMessage from "./utils/errMessage";

export const ALL_MATCHES = "ALL_MATCHES";
export const MATCHES_LOADING = "MATCHES_LOADING";
export const MATCHES_ERR = "MATCHES_ERR";

export const getMatches = matches => ({
  type: ALL_MATCHES,
  matches
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
