import { FETCH_DATA_FULFILLED, FETCH_DATA_REJECTED } from "../constants/fetchData";

export default function reducer(state = {}, action) {
  switch (action.type) {
  case FETCH_DATA_FULFILLED:
    return {
      state, ...action.payload
    };
    break;
  case FETCH_DATA_REJECTED:
    return "error";
    break;
  }

  return state;
}
