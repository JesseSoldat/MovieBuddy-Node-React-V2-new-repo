import React from "react";
import { DebounceInput } from "react-debounce-input";

const SearchBox = ({ searchMovies }) => {
  const search = e => {
    const { value } = e.target;
    searchMovies(value);
  };

  return (
    <div className="row">
      <div className="col-xs-12 col-md-8 m-auto">
        <DebounceInput
          className="form-control mb-4"
          minLength={2}
          debounceTimeout={300}
          onChange={search}
          placeholder="Search for any movie"
        />
      </div>
    </div>
  );
};

export default SearchBox;
