import React, { Component } from "react";
import PropTypes from "prop-types";
 class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.locationInput = React.createRef();
  };

  onkeyPress = e => {
    e.key === "Enter" ? console.log("entered") : null;
  }

  render() {
    return (
      <div className="search-bar">
        <span className="input-wrapper">
          <input
            id="pac-input"
            type="text"
            placeholder="Enter a location"
            onKeyPress={this.onkeyPress}
          />
        </span>
        {/* <button value="locate" id="locate-user" /> */}
      </div>
    );
  }
}

SearchBar.propTypes = {
  fetchRestaurants: PropTypes.func,
};

export default SearchBar;
