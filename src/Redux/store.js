import { legacy_createStore, combineReducers } from "redux";
import authReducer from "./Auth/reducer";
import { productReducer } from "./Product/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  orders: productReducer,
});

export const store = legacy_createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
