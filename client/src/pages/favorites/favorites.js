import React, { Component } from "react";
import { connect } from "react-redux";

import Loading from "../../components/Loading";

import {
  startGetFavorites,
  startRemoveFromFavorites
} from "../../actions/favorites";
import Card from "../../components/Card";

class favorites extends Component {
  componentDidMount() {
    this.props.startGetFavorites();
  }

  removeFromFavorites = movie => {
    this.props.startRemoveFromFavorites(movie._id);
  };

  renderCards = favorites => {
    return favorites.map(movie => {
      const { _id, title, poster_path, movieid } = movie;
      return (
        <Card
          key={movieid}
          _id={_id}
          id={movieid}
          image={poster_path}
          title={title}
          parent="favorites"
          remove={this.removeFromFavorites}
        />
      );
    });
  };

  render() {
    const { favorites, loading } = this.props;
    let content;
    if (loading) {
      content = <Loading />;
    } else if (!loading && favorites.length > 0) {
      content = this.renderCards(favorites);
    }
    return (
      <div className="container">
        <h1 className="text-center mb-3 mt-3 display-4">Favorite Movies</h1>
        <div className="d-flex flex-wrap">{content}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ favorites }) => ({
  favorites: favorites.favorites,
  loading: favorites.loading,
  error: favorites.error
});

export default connect(
  mapStateToProps,
  { startGetFavorites, startRemoveFromFavorites }
)(favorites);
