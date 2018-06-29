import axios from "axios";

import errMessage from "./utils/errMessage";

export const ALL_FAVORITES = "ALL_FAVORITES";
export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";
export const FAVORITES_LOADING = "FAVORITES_LOADING";
export const FAVORITES_ERR = "FAVORITES_ERR";

export const addToFavorites = favorite => ({
  type: ADD_TO_FAVORITES,
  favorite,
  loading: false,
  err: null
});

export const startAddToFavorites = (
  m,
  type = null,
  history = null
) => async dispatch => {
  dispatch({ type: FAVORITES_LOADING, loading: true });
  const id = m.id || m.movieid;
  const movie = {
    movieid: id,
    title: m.title || "",
    poster_path: m.image || ""
  };

  try {
    const res = await axios.post("/api/favorites/movies", movie);
    dispatch(addToFavorites(res.data));
    if (type !== null) history.push("/favorites");
  } catch (err) {
    console.log(err);

    dispatch({ type: FAVORITES_ERR, error: errMessage("post", "favorites") });
  }
};

export const getFavorites = favorites => ({
  type: ALL_FAVORITES,
  favorites,
  loading: false,
  err: null
});

export const startGetFavorites = () => async dispatch => {
  dispatch({ type: FAVORITES_LOADING, loading: true });
  try {
    const res = await axios.get("/api/favorites/movies");
    dispatch(getFavorites(res.data));
  } catch (err) {
    dispatch({ type: FAVORITES_ERR, error: errMessage("get", "favorites") });
  }
};

export const removeFromFavorites = _id => ({
  type: REMOVE_FROM_FAVORITES,
  _id,
  loading: false,
  error: null
});

export const startRemoveFromFavorites = (
  _id,
  type = null,
  history = null
) => async dispatch => {
  try {
    await axios.delete(`/api/favorites/movies/${_id}`);
    dispatch(removeFromFavorites(_id));
    if (type !== null) history.push("/favorites");
  } catch (err) {
    dispatch({ type: FAVORITES_ERR, error: errMessage("remove", "favorite") });
  }
};
