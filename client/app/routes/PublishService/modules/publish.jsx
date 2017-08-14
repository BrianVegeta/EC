// import { asyncXhrPost } from 'lib/xhr';

/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'PUBLISH';
export const REDUCER_KEY = 'publish';

/* enums */
export const ASSIGN_ADDRESS_BY_CUSTOMER = '0';
export const ASSIGN_ADDRESS_BY_OWNER = '1';
export const CHARGE_TYPE_FIX = 'fix';
export const CHARGE_TYPE_COUNT = 'count';
export const CHARGE_TYPE_DAY = 'day';

// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);

export const CHANGE_DATA = prefix('CHANGE_DATA');
export const TOUCH_PATH = prefix('TOUCH_PATH');
export const RESET = prefix('RESET');


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
  /* ABOUT */
  title: '',
  descript: '',
  cityName: '',
  areaName: '',
  categoryID: null,
  tag1: '',
  tag2: '',
  tag3: '',
  /* DELIVERY */
  assignAddressByCustomer: false,
  assignAddressByOwner: false,
  assignCity: '',
  assignArea: '',
  assignAddress: '',
  /* PRICE */
  chargeType: '',
  price: null,
  deposit: null,
  startDate: null,
  endDate: null,
  unit: 0,
  reservationDays: 1,
  discount: '',
  regulation: '',
};

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
