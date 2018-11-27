import { compose, createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";

import thunk from "redux-thunk";
import reducer from "./reducers"; // Gets the State from the reducer(s)

const middleware = applyMiddleware(thunk, createLogger());
let store = compose(createStore)(
  reducer,
  middleware
);

export default store;
