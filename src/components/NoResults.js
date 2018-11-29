import React, { Component } from "react";
import PropTypes from "prop-types";

const NoResults = () => {
  return (
    <div className="no-results">
      <h3>No results found at this location!</h3>
    </div>
  );
};

NoResults.propTypes = {
  fetchRestaurants: PropTypes.func,
};

export default NoResults;
