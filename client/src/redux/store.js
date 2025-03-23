// src/redux/store.js
import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk"; // correctly imported
import authReducer from "./reducers/authReducer";
import employeeReducer from "./reducers/employeeReducer";

const rootReducer = combineReducers({
  employee: employeeReducer,
  auth: authReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk) // NO devtools used
);

export default store;
