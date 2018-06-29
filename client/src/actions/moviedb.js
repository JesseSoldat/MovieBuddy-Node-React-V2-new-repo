import jsonp from "jsonp";
import errMessage from "./utils/errMessage";
import config from "../config/config";

const apiKey = `api_key=${config.MOVIE_DB_API_KEY}`;
const baseUrl = "https://api.themoviedb.org/3/";
const callBack = "&callback=JSONP_CALLBACK";
const popular = "&sort_by=popularity.desc";

export const ALL_DB_MOVIES = "ALL_DB_MOVIES";
export const ONE_DB_MOVIE = "ONE_DB_MOVIE";
export const DB_MOVIE_LOADING = "DB_MOVIE_LOADING";
export const DB_MOVIE_ERR = "DB_MOVIE_ERR";

export const getMovies = (movies = [], search = "") => ({
  type: ALL_DB_MOVIES,
  movies,
  search,
  loading: false,
  error: null
});

export const startGetMovies = (search = "") => dispatch => {
  dispatch({ type: DB_MOVIE_LOADING, loading: true });
  const getMoviesStr = "search/movie?query=";
  const url = `${baseUrl}${getMoviesStr}${search}${popular}&${apiKey}${callBack}`;

  jsonp(url, null, (err, res) => {
    if (err) {
      return dispatch({
        type: DB_MOVIE_ERR,
        loading: false,
        error: errMessage("get", "movies")
      });
    }

    const movies = res.results;
    localStorage.setItem("dbmovies", JSON.stringify({ movies, search }));
    dispatch(getMovies(movies, search));
  });
};

export const getMovie = (movie = null) => ({
  type: ONE_DB_MOVIE,
  movie,
  loading: false,
  error: null
});

export const startGetMovie = id => dispatch => {
  dispatch({ type: DB_MOVIE_LOADING, loading: true });
  const url = `${baseUrl}movie/${id}?${apiKey}`;

  jsonp(url, null, (err, data) => {
    if (err) {
      return dispatch({
        type: DB_MOVIE_ERR,
        loading: false,
        error: errMessage("get", "movie")
      });
    }

    localStorage.setItem("movie", JSON.stringify(data));
    dispatch(getMovie(data));
  });
};
