import React, { Component } from "react";
import { connect } from "react-redux";

import { startGetMatches } from "../../actions/matches";
import Loading from "../../components/Loading";

class Matches extends Component {
  componentDidMount() {
    this.props.startGetMatches();
  }

  render() {
    const { matches, loading, error } = this.props;

    let content, message;
    if (loading) {
      content = <Loading />;
    } else if (!loading && !matches) {
      content = "NO MATCHES FOUND";
    } else {
      content = "MATCHES FOUND";
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
