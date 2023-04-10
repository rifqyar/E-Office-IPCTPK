import { configureStore, combineReducers} from '@reduxjs/toolkit';
import loadingReducer from './reducers/loadingReducer';
 
const reducer = combineReducers({
  loading: loadingReducer,
})
const store = configureStore({
  reducer,
})

export default store;