import {
  ALL_DB_MOVIES,
  ONE_DB_MOVIE,
  DB_MOVIE_LOADING,
  DB_MOVIE_ERR
} from "../actions/moviedb";

const initialState = {
  search: null,
  movies: [],
  movie: null,
  loading: true,
  error: null
};

export default (
  state = initialState,
  { type, movies, movie, search, loading, error }
) => {
  switch (type) {
    case DB_MOVIE_LOADING:
      return {
        ...state,
        loading
      };

    case DB_MOVIE_ERR:
      console.log("DB_MOVIE_ERR", error);
      return {
        ...state,
        loading,
        error
      };
    case ALL_DB_MOVIES:
      return {
        ...state,
        movies,
        search,
        loading,
        error
      };

    case ONE_DB_MOVIE:
      return {
        ...state,
        movie,
        loading,
        error
      };

    default:
      return { ...state };
  }
};
