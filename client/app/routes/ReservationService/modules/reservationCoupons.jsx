import { now } from 'lib/time';
import { asyncXhrAuthedGet } from 'lib/xhr';

/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'RESERVATION.COUPONS';
export const REDUCER_KEY = 'reservationCoupons';

// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);

const SET_COUPONS = prefix('SET_COUPONS');
const RESET = prefix('RESET');


// =============================================
// = actions =
// =============================================

const setCoupons = coupons => ({
  type: SET_COUPONS,
  coupons,
});

export const fetchCoupons = () =>
  (dispatch, getState) => {
    asyncXhrAuthedGet('/ajax/my_coupons.json', getState())
    .then((data) => {
      dispatch(setCoupons(data));
    });
  };

export const reset = () => ({
  type: RESET,
});


// =============================================
// = reducer =
// =============================================
const initialState = {
  updatedAt: null,
  records: [],
};

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_COUPONS:
      return Object.assign({}, state, {
        updatedAt: now(),
        records: action.coupons,
      });

    case RESET:
      return initialState;

    default:
      return state;
  }
};
