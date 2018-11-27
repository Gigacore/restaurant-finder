import React, { Component } from "react";

import Map from "../components/Map";
import SearchBar from "../components/SearchBar";

import { connect } from "react-redux";
import { fetchData } from "../actions/fetchActions";

export class MapContainer extends Component {
  render() {
    return (
      <React.Fragment>
        <SearchBar />
        <Map
          {...this.props}
          fetchRestaurants={this.props.fetchRestaurants}
          data={this.props.data}
        />
      </React.Fragment>
    );
  }
}

export const mapStateToProps = store => {
  return {
    data: store
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    fetchRestaurants: locationValue => {
      dispatch(fetchData(locationValue));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
