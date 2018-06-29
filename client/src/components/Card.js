import React, { Component } from "react";
import { Link } from "react-router-dom";

import truncateText from "../utils/truncateText";

class Card extends Component {
  state = {
    disabled: false
  };

  renderImage = image =>
    image ? `http://image.tmdb.org/t/p/w500/${image}` : "/images/noFilm.png";

  disableAddBtn = movie => {
    this.setState(prevState => {
      this.props.add(movie);
      return { disabled: true };
    });
  };

  disableDeleteBtn = movie => {
    this.setState(prevState => {
      this.props.remove(movie);
      return { disabled: true };
    });
  };

  renderDeleteBtn = movie => {
    return (
      <button
        className="btn btn-danger"
        onClick={e => this.disableDeleteBtn(movie)}
      >
        <span>
          <i className="fas fa-trash mr-2" />
          Delete
        </span>
      </button>
    );
  };

  renderAddBtn = movie => {
    return (
      <button
        className="btn btn-primary"
        onClick={e => this.disableAddBtn(movie)}
      >
        <i className="fas fa-heart mr-2" />
        Favorite
      </button>
    );
  };

  renderLoadingBtn = (string, btnType) => {
    return (
      <button className={`btn btn-${btnType}`}>
        <i className="fas fa-spinner fa-spin mr-2" />
        {string}
      </button>
    );
  };

  render() {
    const { _id = null, id, image, title, parent } = this.props;
    const { disabled } = this.state;
    return (
      <div className="card ml-auto mr-auto mb-3" style={{ width: "270px" }}>
        <img
          style={{ height: "400px" }}
          className="card-img-top"
          src={this.renderImage(image)}
          alt="poster"
        />
        <div className="card-body pb-0">
          <h6 className="card-title text-center">{truncateText(title, 24)}</h6>
        </div>

        <div className="card-body pt-1 d-flex flex-row justify-content-around">
          <Link
            to={`/movie-details/${id}?parent=${parent}&id=${_id}`}
            className="btn btn-secondary"
          >
            <i className="fas fa-clipboard-list mr-2" />
            <span>Details</span>
          </Link>

          {parent === "search" && !disabled
            ? this.renderAddBtn({ id, title, image })
            : null}
          {parent === "search" && disabled
            ? this.renderLoadingBtn("Favorite", "primary")
            : null}

          {parent === "favorites" && !disabled
            ? this.renderDeleteBtn({ _id, id, title, image })
            : null}
          {parent === "favorites" && disabled
            ? this.renderLoadingBtn("Delete", "danger")
            : null}
        </div>
      </div>
    );
  }
}

export default Card;
