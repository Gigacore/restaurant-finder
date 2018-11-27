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
      <input
        id="pac-input"
        type="text"
        placeholder="Enter a location"
        onBlur={this.handleInput}
        ref={this.locationInput}
        onKeyPress={this.onkeyPress}
      />
    );
  }
}

SearchBar.propTypes = {
  fetchRestaurants: PropTypes.func,
};

SearchBar.defaultProps = {
  resetLabel: "RESET",
};

export default SearchBar;
