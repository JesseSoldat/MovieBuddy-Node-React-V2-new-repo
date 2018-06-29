import React, { Component } from "react";
import { connect } from "react-redux";

import { startGetMovies } from "../../actions/moviedb";
import {
  startAddToFavorites,
  startGetFavorites
} from "../../actions/favorites";
import SearchBox from "../../components/SearchBox";
import Card from "../../components/Card";

class Search extends Component {
  componentDidMount() {
    this.props.startGetFavorites();
  }

  searchMovies = text => {
    this.props.startGetMovies(text);
  };

  addToFavorites = movie => {
    this.props.startAddToFavorites(movie);
  };

  renderCards = movies =>
    movies.map(movie => {
      const { title, poster_path, id } = movie;
      return (
        <Card
          key={id}
          id={id}
          image={poster_path}
          title={title}
          parent="search"
          add={this.addToFavorites}
        />
      );
    });

  render() {
    const { movies, favorites } = this.props;
    let favoriteIds, filtered;
    if (favorites) {
      favoriteIds = favorites.map(fav => fav.movieid);
      filtered = movies.filter(movie => !favoriteIds.includes(movie.id));
    }

    const filteredMovies = filtered ? filtered : movies;

    return (
      <div className="container">
        <h1 className="text-center mb-3 mt-3 display-4">Search Movies</h1>
        <SearchBox searchMovies={this.searchMovies} />
        <div className="d-flex flex-wrap">
          {this.renderCards(filteredMovies)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ moviedb, favorites }) => ({
  movies: moviedb.movies,
  favorites: favorites.favorites
});

export default connect(
  mapStateToProps,
  { startGetMovies, startAddToFavorites, startGetFavorites }
)(Search);
