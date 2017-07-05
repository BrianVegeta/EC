import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import environment from './environmentReducer';
import auth from './authReducer';
import banners from './bannersReducer';
import routesHelper from './routesHelperReducer';
import recommends from './recommendsReducer';
import items from './itemsReducer';
import itemRelease from './itemReleaseReducer';
import cities from './citiesReducer';
import publish from './publishReducer';
import search from './searchReducer';
import mine from './mineReducer';
import notification from './notificationReducer';
import home from './homeReducer';
import item from './item';
import reservation from './reservationReducer';

export default combineReducers({
  routing: routerReducer,
  environment,
  auth,
  banners,
  items,
  routesHelper,
  recommends,
  itemRelease,
  cities,
  publish,
  search,
  mine,
  notification,
  home,
  item,
  reservation,
});
