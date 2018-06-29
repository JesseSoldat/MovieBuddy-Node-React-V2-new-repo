import React from "react";

const Loading = () => {
  return (
    <div className="dark-backdrop">
      <div className="spinner-div">
        <i className="fas fa-spinner fa-5x fa-spin" />
      </div>
    </div>
  );
};

export default Loading;
