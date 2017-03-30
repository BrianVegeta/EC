import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import environment from './environmentReducer';
import auth from './authReducer';
import banners from './bannersReducer';
import routes from './routesReducer';

export default combineReducers({
  routing: routerReducer,
  environment,
  auth,
  banners,
  routes,
});
