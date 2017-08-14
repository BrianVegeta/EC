import { asyncXhrAuthedPost } from 'lib/xhr';

/* =============================================>>>>>
= userprofile =
===============================================>>>>>*/

const ACTION_PREFIX = 'MY.COLLECTIONS';
const REDUCER_KEY = 'myCollection';

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

const fetching = () => ({
  type: FETCHING,
});

const fetched = records => ({
  type: FETCHED,
  records,
});

export const reset = () => ({
  type: RESET,
});

export function fetchCollections() {
  return (dispatch, getState) => {
    dispatch(fetching());
    asyncXhrAuthedPost(
      '/ajax/get_fav.json',
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
        records: action.records,
      });

    case RESET:
      return initialState;

    default:
      return state;
  }
};
