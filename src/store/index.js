import { configureStore } from "@reduxjs/toolkit"
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers"; 

const store = configureStore(
  rootReducer,
  composeWithDevTools()
)

export default store;