import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import SingleField from "./SingleField";

class CardDetails extends Component {
  state = {
    disabled: false
  };

  renderImage = image =>
    image ? `http://image.tmdb.org/t/p/w500/${image}` : "/images/noFilm.png";

  renderList = (string, array = []) => {
    if (!array.length) return;
    const list = array.map(
      (item, i) =>
        array.length === i + 1 ? (
          <span key={item.id}>{item.name}</span>
        ) : (
          <span key={item.id}>{item.name}, </span>
        )
    );
    return <SingleField field={string} value={list} />;
  };

  disableAddBtn = movie => {
    this.setState(() => {
      this.props.add(movie);
      return { disabled: true };
    });
  };

  disableDeleteBtn = movie => {
    this.setState(() => {
      this.props.remove(movie);
      return { disabled: true };
    });
  };

  renderAddBtn = movie => {
    return (
      <Fragment>
        <Link to="/search" className="btn btn-secondary mr-2">
          <i className="fas fa-arrow-circle-left mr-2" />
          <span className="mr-2">Back</span>
        </Link>
        <button
          className="btn btn-primary"
          onClick={() => this.disableAddBtn(movie)}
        >
          <i className="fas fa-heart mr-2" />
          Favorite
        </button>
      </Fragment>
    );
  };

  renderDeleteBtn = movie => {
    return (
      <Fragment>
        <Link to="/favorites" className="btn btn-secondary mr-2">
          <i className="fas fa-arrow-circle-left mr-2" />
          <span className="mr-2">Back</span>
        </Link>
        <button
          className="btn btn-danger"
          onClick={() => this.disableDeleteBtn(movie)}
        >
          <i className="fas fa-trash mr-2" />
          Delete
        </button>
      </Fragment>
    );
  };

  renderLoadingBtn = (string, parent, btnType) => {
    return (
      <Fragment>
        <Link to={parent} className="btn btn-secondary mr-2">
          <i className="fas fa-arrow-circle-left mr-2" />
          <span className="mr-2">Back</span>
        </Link>
        <button className={`btn btn-${btnType}`}>
          <i className="fas fa-spinner fa-spin mr-2" />
          {string}
        </button>
      </Fragment>
    );
  };

  render() {
    const {
      _id,
      movieid,
      parent,
      title,
      poster_path,
      original_title,
      release_date,
      vote_average,
      genres,
      production_companies,
      overview,
      homepage
    } = this.props;
    const { disabled } = this.state;

    return (
      <div className="card mb-3 mt-3">
        <div className="card-header">
          <h3 className="card-title p-1 m-1">{title}</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-12 col-md-5 ml-mr-auto">
              <img
                src={this.renderImage(poster_path)}
                className="img-fluid"
                alt="poster"
              />
            </div>
            <div className="col-xs-12 col-1" />

            <div className="col-sm-12 col-md-6 ml-mr-auto">
              <ul className="list-group list-group-flush">
                <SingleField field="Original Title" value={original_title} />
                <SingleField field="Release Date" value={release_date} />
                <SingleField field="Rating" value={vote_average} />
                {this.renderList("Genres", genres)}
                {this.renderList("Production Company", production_companies)}
                <SingleField field="Description" value={overview} />
                <SingleField field="Home Page" value={homepage} type="link" />
              </ul>
            </div>
          </div>
        </div>
        <div className="card-footer">
          {parent === "search" && !disabled
            ? this.renderAddBtn({ movieid, title, image: poster_path })
            : null}
          {parent === "search" && disabled
            ? this.renderLoadingBtn("Favorite", "/search", "primary")
            : null}

          {parent === "favorites" && !disabled
            ? this.renderDeleteBtn({ _id, movieid, title, poster_path })
            : null}
          {parent === "favorites" && disabled
            ? this.renderLoadingBtn("Delete", "/favorites", "danger")
            : null}
        </div>
      </div>
    );
  }
}

export default CardDetails;
