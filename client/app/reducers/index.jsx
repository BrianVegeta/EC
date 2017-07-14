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
import item from './itemReducer';
import reservation from './reservationReducer';
import myCoupons from './myCouponsReducer';
import modal from './modalReducer';
import popup from './popupReducer';
import secrecyVerification from './secrecyVerificationReducer';
import schedule from './scheduleReducer';
import options from './optionsReducer';
import popupBankSetup from './popupBankSetupReducer';
import verifyProfileChange from './verifyProfileChangeReducer';

export default combineReducers({
  routing: routerReducer,
  modal,
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
  myCoupons,
  secrecyVerification,
  popup,
  schedule,
  options,
  popupBankSetup,
  verifyProfileChange,
});
