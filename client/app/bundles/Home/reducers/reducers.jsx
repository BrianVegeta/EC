import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import enviroment from './enviromentReducer';

export default combineReducers({
  enviroment,
  routing: routerReducer,
});
