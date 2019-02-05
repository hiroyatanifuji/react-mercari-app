import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { routerReducer, routerMiddleware } from "react-router-redux";
import * as reducers from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  ...reducers,
  router: routerReducer,
  form: formReducer,
});

export default function createStore(history) {
  return reduxCreateStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(
        logger,
        thunk,
        routerMiddleware(history)
      ),
    ),
  );
}