import React, { Component } from "react";
import PropTypes from "prop-types";
import loadjs from "loadjs";

import NoResults from "./NoResults";

class Map extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hasNoResults: false
    };
  };

  componentDidMount() {
    window.initMap = this.initMap;
    const API_KEY = "AIzaSyCm81g_wojVpaZFjbiflmKL7lBtlcxio40"; // Google Maps API Key

    loadjs(`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=initMap`);

    const detectLocation = new Promise((resolve,reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve(position.coords);
        }, (error) => {
          if(error.code === error.PERMISSION_DENIED) {
            console.error("Error detecting location.");

            // Loads the map with default coordinates information if the user does not allow sharing his/her location
            const defaultCoords = {
              lat: 12.9250,
              lng: 77.5938,
            };

            // Initiate with default coordinates
            this.props.fetchRestaurants(defaultCoords);
          }
        });
      }
    });

    detectLocation.then((location) => {
      const coords = {
        lat: location.latitude,
        lng: location.longitude,
      };

      this.props.fetchRestaurants(coords);
    }).catch(() => {
      console.log(err);
    });
  }

  componentDidUpdate(prevProps) {
    if(this.props.data !== prevProps.data) {
      initMap.call(this, this.props.data.restaurantsData);
    }
  }

  initMap = data => {
    if(data && data.nearby_restaurants) {

      this.setState({
        hasNoResults: false
      });

      const spawnPos = {lat: parseFloat(data.nearby_restaurants[0].restaurant.location.latitude), lng: parseFloat(data.nearby_restaurants[0].restaurant.location.longitude)};

      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: spawnPos
      });

      const autocomplete = new google.maps.places.Autocomplete(document.getElementById("pac-input"));
      const populateRestaurants = this.props.fetchRestaurants;

      for(let i=0; i < data.nearby_restaurants.length; i++) {
        const restaurant = data.nearby_restaurants[i].restaurant.location;

        const infowindow = new google.maps.InfoWindow({
          content: data.nearby_restaurants[i].restaurant.name
        });

        const marker = new google.maps.Marker({
          position: {lat: parseFloat(restaurant.latitude), lng: parseFloat(restaurant.longitude)},
          map: map
        });

        marker.addListener("click", function() {
          infowindow.close();
          infowindow.open(map, marker);
        });
      }

      autocomplete.addListener("place_changed", () => {
        const placeResult = autocomplete.getPlace();

        // Gather the user provided / automatically fetched location and fetch the restaurants.
        populateRestaurants({
          lat: placeResult.geometry.location.lat(),
          lng: placeResult.geometry.location.lng(),
        });

        if (placeResult.geometry.viewport) {
          map.fitBounds(placeResult.geometry.viewport);
        } else {
          map.setCenter(placeResult.geometry.location);
          map.setZoom(17);
        }
      });
    } else if(data === "error") {
      this.setState({
        hasNoResults: true
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div id="map">
          <p className="loading">loading...</p>
        </div>
        {this.state.hasNoResults && (
          <NoResults />
        )}
      </React.Fragment>
    );
  }
}

Map.propTypes = {
  fetchRestaurants: PropTypes.func,
  data: PropTypes.object,
};

export default Map;
