import React from "react";
import isEmpty from "../utils/isEmpty";

const SingleField = ({ field, value, type = null }) => {
  const content = isEmpty(value) ? (
    <li className="pb-3 list-group-item">
      <strong className="pr-3">{field}: </strong>
      <br /> {field} is not available
    </li>
  ) : (
    <li className="pb-3 list-group-item">
      <strong className="pr-3">{field}: </strong>
      <br />{" "}
      {type ? (
        <a href={value} target="_blank">
          {value}
        </a>
      ) : (
        value
      )}
    </li>
  );

  return content;
};

export default SingleField;
