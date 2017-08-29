import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import cities from 'modules/cities';
import categories from 'modules/categories';
import popup from 'modules/popup';
import access from 'modules/access';
import banks from 'modules/banks';
import personalBankInfo from 'modules/personalBankInfo';
import orderAction from 'modules/orderAction';
import routingHelper from 'modules/routingHelper';
import auth from 'modules/auth';
import login from 'modules/login';

import myCoupon from 'connector/myCoupon/reducer';
import environment from './environmentReducer';
// import auth from './authReducer';
import banners from './bannersReducer';
import routesHelper from './routesHelperReducer';
import recommends from './recommendsReducer';
import itemRelease from './itemReleaseReducer';
// import publish from './publishReducer';
import search from './searchReducer';
import notification from './notificationReducer';
import home from './homeReducer';
import reservation from './reservationReducer';
import modal from './modalReducer';
import secrecyVerification from './secrecyVerificationReducer';
import schedule from './scheduleReducer';
import options from './optionsReducer';
import popupBankSetup from './popupBankSetupReducer';


const reducers = {
  routing: routerReducer,
  routingHelper,
  personalBankInfo,
  cities,
  categories,
  banks,
  modal,
  environment,
  auth,
  login,
  banners,
  routesHelper,
  recommends,
  itemRelease,
  search,
  notification,
  home,
  reservation,
  secrecyVerification,
  popup,
  schedule,
  options,
  popupBankSetup,
  access,
  // myCollection,
  // ownerProfile,
  // coupon,
  myCoupon,
  orderAction,
};

const RESET_ONE = 'RESET_ONE';
const handleState = (state, action) => {
  if (action.type === RESET_ONE) {
    return Object.assign({}, state, { [action.key]: undefined });
  }
  return state;
};

const makeRootReducer = asyncReducers =>
  (state, action) => {
    const newState = handleState(state, action);
    return combineReducers({
      ...asyncReducers,
      ...reducers,
    })(newState, action);
  };

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export const removeReducer = (store, { key }) => {
  delete store.asyncReducers[key];
  // Reflect.deleteProperty(store.asyncReducers, key);

  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export const resetReducer = (store, { key }) => {
  store.dispatch({ type: RESET_ONE, key });
  // Reflect.deleteProperty(store.asyncReducers, key);
};

export default makeRootReducer;
