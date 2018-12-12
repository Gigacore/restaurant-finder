import React, { Component } from "react";
import PropTypes from "prop-types";
 class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.locationInput = React.createRef();
  };

  render() {
    return (
      <div className="search-bar">
        <span className="input-wrapper">
          <input
            id="pac-input"
            type="text"
            placeholder="Enter a location"
          />
        </span>
      </div>
    );
  }
}

SearchBar.propTypes = {
  fetchRestaurants: PropTypes.func,
};

export default SearchBar;
