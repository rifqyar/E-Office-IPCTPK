import { configureStore, combineReducers} from '@reduxjs/toolkit';
import loadingReducer from './reducers/loadingReducer';
import userReducer from './reducers/userReducer';
 
const reducer = combineReducers({
  loading: loadingReducer,
  userReducer
})
const store = configureStore({
  reducer,
})

export default store;