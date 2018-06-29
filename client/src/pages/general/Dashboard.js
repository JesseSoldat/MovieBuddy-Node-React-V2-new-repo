import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container">
      <h1 className="text-center mb-3 mt-3 display-4">Dashboard</h1>
      <div className="d-flex flex-wrap">
        <div
          className="card text-center mt-3 ml-auto mr-auto mb-3"
          style={{ width: "300px" }}
        >
          <div className="card-header">
            <h4>Search Movies</h4>
          </div>
          <div className="card-body d-flex flex-column justify-content-between">
            <p className="card-text text-left">
              Get started by visiting the search page and start typing to find
              all of your favorites movies with the MovieDB Api.
            </p>
            <Link to="/search" className="btn btn-outline-dark btn-block">
              Search
            </Link>
          </div>
        </div>

        <div
          className="card text-center mt-3 ml-auto mr-auto mb-3"
          style={{ width: "300px" }}
        >
          <div className="card-header">
            <h4>Favorite Movies</h4>
          </div>
          <div className="card-body d-flex flex-column justify-content-between">
            <p className="card-text text-left">
              Not sure whate movie to watch tonight? Check out your own custom
              list of movies.
            </p>
            <Link to="/favorites" className="btn btn-outline-dark btn-block">
              Favorites
            </Link>
          </div>
        </div>

        <div
          className="card text-center mt-3 ml-auto mr-auto mb-3"
          style={{ width: "300px" }}
        >
          <div className="card-header">
            <h4>Match Others</h4>
          </div>
          <div className="card-body d-flex flex-column justify-content-between">
            <p className="card-text text-left">
              Find other people with a similar interest in movies and some new
              movies to your list.
            </p>
            <Link to="/matches" className="btn btn-outline-dark btn-block">
              Match
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
