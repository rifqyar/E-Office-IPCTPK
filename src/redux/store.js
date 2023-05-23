import { configureStore, combineReducers} from '@reduxjs/toolkit';
import loadingReducer from './reducers/loadingReducer';
import userReducer from './reducers/userReducer';
import modalReducer from './reducers/modalReducer';
 
const reducer = combineReducers({
  loading: loadingReducer,
  userReducer,
  modal: modalReducer
})
const store = configureStore({
  reducer,
})

export default store;