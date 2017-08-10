import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import myCoupon from 'connector/myCoupon/reducer';
import environment from './environmentReducer';
import auth from './authReducer';
import banners from './bannersReducer';
import routesHelper from './routesHelperReducer';
import recommends from './recommendsReducer';
import itemRelease from './itemReleaseReducer';
import cities from './citiesReducer';
import publish from './publishReducer';
import search from './searchReducer';
import mine from './mineReducer';
import notification from './notificationReducer';
import home from './homeReducer';
import reservation from './reservationReducer';
import modal from './modalReducer';
import popup from './popupReducer';
import secrecyVerification from './secrecyVerificationReducer';
import schedule from './scheduleReducer';
import options from './optionsReducer';
import popupBankSetup from './popupBankSetupReducer';
import accessCheck from './accessCheckReducer';


const reducers = {
  routing: routerReducer,
  modal,
  environment,
  auth,
  banners,
  routesHelper,
  recommends,
  itemRelease,
  cities,
  publish,
  search,
  mine,
  notification,
  home,
  reservation,
  secrecyVerification,
  popup,
  schedule,
  options,
  popupBankSetup,
  accessCheck,
  // myCollection,
  // ownerProfile,
  // coupon,
  myCoupon,
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
