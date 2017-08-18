import { asyncXhrAuthedPost } from 'lib/xhr';

/* =============================================>>>>>
= orderDetail =
===============================================>>>>>*/

const ACTION_PREFIX = 'SUE.DETAIL';

// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);

const FETCHING = prefix('FETCHING');
const FETCHED = prefix('FETCHED');
const RESET = prefix('RESET');

// =============================================
// = actions =
// =============================================
const fetching = () => ({
  type: FETCHING,
});

const fetched = result => ({
  type: FETCHED,
  result,
});


export const reset = () => ({
  type: RESET,
});

export function fetchOrder(cid) {
  return (dispatch, getState) => {
    dispatch(fetching());
    asyncXhrAuthedPost(
      '/ajax/get_order.json',
      { cid },
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
  records: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING:
      return Object.assign({}, state, {
        isFetching: true,
      });

    case FETCHED:
      return Object.assign({}, state, {
        isFetching: false,
        records: action.result,
      });

    case RESET:
      return initialState;

    default:
      return state;
  }
};
