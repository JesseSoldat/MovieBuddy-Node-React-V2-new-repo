import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { startGetMatches } from "../../actions/matches";
import Loading from "../../components/Loading";
import hasOwnProp from "../../utils/hasOwnProp";
import capitalize from "../../utils/capitalize";
import sortArrayOfObjs from "../../utils/sortArrayOfObjs";

class Matches extends Component {
  componentDidMount() {
    this.props.startGetMatches();
  }

  renderList = array => {
    return array.map(({ unmatched, matched }) => {
      const movieLength = unmatched.length;
      const { user } = unmatched[0];
      const { username } = user;
      return (
        <li
          key={user._id}
          className="list-group-item d-flex justify-content-between"
        >
          <div>
            {capitalize(username)} matched <strong>{matched}</strong> movies
            with you. &nbsp;
            {capitalize(username)} has <strong>{movieLength}</strong> other
            movies that you may like.
          </div>

          <Link className="btn btn-primary" to={`/matched-movies/${user._id}`}>
            View Movies
          </Link>
        </li>
      );
    });
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
          listArray.push(matches[prop]);
        }
      }

      const sortedListArray = sortArrayOfObjs(listArray, "matched", "desc");

      content = (
        <Fragment>
          <h1 className="text-center mb-3 mt-3 display-4">User Matches</h1>
          <ul className="list-group list-group-flush mt-4">
            {this.renderList(sortedListArray)}
          </ul>
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
