import {
  ALL_FAVORITES,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  FAVORITES_LOADING,
  FAVORITES_ERR
} from "../actions/favorites";

const initialState = {
  favorites: [],
  loading: true,
  error: null
};

export default (
  state = initialState,
  { type, _id, favorites, favorite, loading, error }
) => {
  switch (type) {
    case FAVORITES_LOADING:
      return { ...state, loading };

    case FAVORITES_ERR:
      console.log("FAVORITES_ERR", error);
      return { ...state, loading: false, error };

    case ALL_FAVORITES:
      // console.log("ALL_FAVORITES", favorites);
      return {
        ...state,
        favorites: [...favorites],
        loading: false,
        error: null
      };

    case ADD_TO_FAVORITES:
      // console.log("ADD_TO_FAVORITES", favorite);
      return {
        ...state,
        favorites: [...state.favorites, favorite],
        loading,
        error
      };

    case REMOVE_FROM_FAVORITES:
      // console.log("REMOVE_FROM_FAVORITES", _id);
      const filteredFav = [...state.favorites].filter(f => f._id !== _id);
      return {
        ...state,
        favorites: filteredFav,
        loading,
        error
      };

    default:
      return { ...state };
  }
};
