import { isEqual } from 'lodash';

/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'RESERVATION.SERVICE';
export const REDUCER_KEY = 'reservationService';
export const PAYMENT_TYPE_ATM = 1;
export const PAYMENT_TYPE_CREDIT_CARD = 4;

// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);

const CHANGE_DATA = prefix('CHANGE_DATA');
const TOUCH_PATH = prefix('TOUCH_PATH');
const RESET = prefix('RESET');


// =============================================
// = actions =
// =============================================

export const changeData = data => ({
  type: CHANGE_DATA,
  data,
});

export const touchPath = path => ({
  type: TOUCH_PATH,
  path,
});

export const reset = () => ({
  type: RESET,
});


// =============================================
// = reducer =
// =============================================
const initialState = {
  touchedStepPaths: [],
  leasestart: null,
  leaseend: null,
  couponNo: null,
  serviceLocationType: null,
  serviceCity: '',
  serviceArea: '',
  serviceAddress: '',
  note: '',
  unit: 1,
  paymenttype: null,
};
export const isStateInitial = state =>
  isEqual(state, initialState);

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DATA:
      return Object.assign({}, state, action.data);

    case TOUCH_PATH: {
      if (state.touchedStepPaths.includes(action.path)) {
        return state;
      }
      return Object.assign({}, state, {
        touchedStepPaths: state.touchedStepPaths.concat(action.path),
      });
    }

    case RESET:
      return initialState;

    default:
      return state;
  }
};
