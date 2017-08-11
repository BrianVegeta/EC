import { asyncXhrAuthedPost } from 'lib/xhr';

/* =============================================>>>>>
= myCoupon =
===============================================>>>>>*/

const ACTION_PREFIX = 'MY.COUPON';
const REDUCER_KEY = 'myCoupon';

// =============================================
// = action type =
// =============================================

const prefix = action => (`${ACTION_PREFIX}.${action}`);

export const FETCHED = prefix('FETCHED');
export const FETCHING = prefix('FETCHING');
export const RESET = prefix('RESET');

// =============================================
// = actions =
// =============================================

const fetched = records => ({
  type: FETCHED,
  records,
});

const fetching = () => ({
  type: FETCHING,
});

export const reset = () => ({
  type: RESET,
});

export function fetchCoupon() {
  return (dispatch, getState) => {
    dispatch(fetching());
    asyncXhrAuthedPost(
            '/ajax/get_coupon.json',
            {},
            getState(),
    )
    .then((responseData) => {
      dispatch(fetched(responseData));
    });
  };
}

// =============================================
// = reducer =
// =============================================

const initialState = {
  isFetching: false,
  records: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING:
      return Object.assign({}, state, { isFetching: true });

    case FETCHED:
      return Object.assign({}, state, {
        isFetching: false,
        records: action.records
      });

    case RESET:
      return initialState;

    default:
      return state;
  }
};
