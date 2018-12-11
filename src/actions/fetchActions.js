import { FETCH_DATA_FULFILLED, FETCH_DATA_REJECTED  } from "../constants/fetchData";

import axios from "axios";

export const fetchData = locationData => (dispatch) => {

  const { lat, lng } = locationData;
  const endPoint = `https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${lng}&count=20&radius=5000&&order=asc`;

  return axios.get(endPoint, {
    headers: {
      "user-key": "bb5e0e240f8a6998a155cc663e6d9138" // Zomato API Key
    }
  })
  .then((response) => {
    dispatch({type: FETCH_DATA_FULFILLED, payload: response.data});
  })
  .catch((err) => {
    dispatch({type: FETCH_DATA_REJECTED, payload: err});
  });
};
