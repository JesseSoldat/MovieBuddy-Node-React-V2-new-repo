import React, { Component } from "react";
import { connect } from "react-redux";

import {
  startGetSingleUserMatches,
  getSingleUserMatches
} from "../../actions/matches";
import { startAddToFavorites } from "../../actions/favorites";
import Loading from "../../components/Loading";
import Card from "../../components/Card";

class MatchedMovies extends Component {
  componentDidMount() {
    const { matchedUserId } = this.props.match.params;
    this.props.startGetSingleUserMatches(matchedUserId);
  }

  addToFavorites = movie => {
    const { singleUserMatches } = this.props;

    this.props.startAddToFavorites(movie);
    const updatedUnMatched = singleUserMatches.filter(
      ({ movieid }) => movieid !== movie.movieid
    );
    this.props.getSingleUserMatches(updatedUnMatched);
  };

  renderCards = movies => {
    return movies.map(movie => {
      const { title, poster_path, _id, movieid } = movie;

      return (
        <Card
          key={_id}
          movieid={movieid}
          image={poster_path}
          title={title}
          parent="matched"
          add={this.addToFavorites}
        />
      );
    });
  };

  render() {
    const { singleUserMatches, loading, error } = this.props;
    let content, message;

    if (error) {
      message = error;
    }

    if (loading) {
      content = <Loading />;
    } else if (!loading && singleUserMatches.length < 1) {
      content = "There are no matches";
    } else {
      content = (
        <div>
          <h1 className="text-center mt-3 mb-0 display-4">Other Movies</h1>
          <p className="text-center text-muted mb-4">
            They have {singleUserMatches.length} movies to check out
          </p>
          <div className="d-flex flex-wrap">
            {this.renderCards(singleUserMatches)}
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-12">{message}</div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12">{content}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ matches }) => ({
  singleUserMatches: matches.singleUserMatches,
  loading: matches.loading,
  error: matches.error
});

export default connect(
  mapStateToProps,
  { startGetSingleUserMatches, getSingleUserMatches, startAddToFavorites }
)(MatchedMovies);
