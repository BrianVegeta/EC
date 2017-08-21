import { asyncXhrAuthedPost } from 'lib/xhr';

/* =============================================>>>>>
= orderDetail =
===============================================>>>>>*/

const ACTION_PREFIX = 'SERVICE.ITEM';

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

const fetched = record => ({
  type: FETCHED,
  record,
});

export const reset = () => ({
  type: RESET,
});

export function fetchService(pid) {
  return (dispatch, getState) => {
    dispatch(fetching());
    asyncXhrAuthedPost(
      '/ajax/item_detail.json',
      { pid },
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
  record: null,
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
        record: action.record,
      });

    case RESET:
      return initialState;

    default:
      return state;
  }
};
