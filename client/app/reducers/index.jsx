import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// import myCollection from 'connector/myCollections/reducer';
// import ownerProfile from 'connector/Ownerprofile/reducer';
import myCoupon from 'connector/myCoupon/reducer';
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
import modal from './modalReducer';
import popup from './popupReducer';
import secrecyVerification from './secrecyVerificationReducer';
import schedule from './scheduleReducer';
import options from './optionsReducer';
import popupBankSetup from './popupBankSetupReducer';
import accessCheck from './accessCheckReducer';


const makeRootReducer = asyncReducers =>
  combineReducers({
    ...asyncReducers,
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
  });

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.replaceReducer(makeRootReducer(
    Object.assign({}, store.asyncReducers, { [key]: reducer })),
  );
};

export default makeRootReducer;
