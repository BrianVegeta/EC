import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import environment from './environmentReducer';
import auth from './authReducer';
import banners from './bannersReducer';
import routesHelper from './routesHelperReducer';
import recommends from './recommendsReducer';
import items from './itemsReducer';
import itemLayout from './itemLayoutReducer';
import release from './releaseReducer';

export default combineReducers({
  routing: routerReducer,
  environment,
  auth,
  banners,
  items,
  routesHelper,
  recommends,
  itemLayout,
  release,
});
