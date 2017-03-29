import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import enviroment from './enviromentReducer';
import auth from './authReducer';

export default combineReducers({
  routing: routerReducer,
  enviroment,
  auth,
});
