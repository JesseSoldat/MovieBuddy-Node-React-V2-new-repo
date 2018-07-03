import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { startGetMatches } from "../../actions/matches";
import Loading from "../../components/Loading";
import hasOwnProp from "../../utils/hasOwnProp";

class Matches extends Component {
  componentDidMount() {
    this.props.startGetMatches();
  }

  renderList = ({ unmatched, matched }) => {
    const movieLength = unmatched.length;
    const { user } = unmatched[0];
    return (
      <li
        key={user._id}
        className="list-group-item d-flex justify-content-between"
      >
        They have {movieLength} movies that are different. &ensp;
        {user.username} likes {matched} of the same movies as you.
        <Link className="btn btn-primary" to={`/matched-movies/${user._id}`}>
          View Movies
        </Link>
      </li>
    );
  };

  render() {
    const { matches, loading, error } = this.props;

    let content, message;
    if (loading) {
      content = <Loading />;
    } else if (!loading && !matches) {
      content = "NO MATCHES FOUND";
    } else {
      const listArray = [];

      for (var prop in matches) {
        if (hasOwnProp(matches, prop)) {
          listArray.push(this.renderList(matches[prop]));
        }
      }

      content = (
        <Fragment>
          <h1 className="text-center mb-3 mt-3 display-4">User Matches</h1>
          <ul className="list-group list-group-flush mt-4">{listArray}</ul>
        </Fragment>
      );
    }
    if (error) {
      message = "ERROR";
    }

    return (
      <div className="container">
        {message}
        {content}
      </div>
    );
  }
}

const mapStateToProps = ({ matches }) => ({
  matches: matches.matches,
  loading: matches.loading,
  error: matches.error
});

export default connect(
  mapStateToProps,
  { startGetMatches }
)(Matches);
