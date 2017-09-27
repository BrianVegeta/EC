import { asyncXhrAuthedPost } from 'lib/xhr';
import { find, parseInt } from 'lodash';

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
  return (dispatch, getState) =>
    new Promise((resolve) => {
      dispatch(fetching());
      asyncXhrAuthedPost(
        '/ajax/get_fav.json',
        {},
        getState(),
      ).then((responseData) => {
        dispatch(fetched(responseData));
        resolve(responseData);
      });
    });
}

export function inCollection(pid) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const {
        records,
      } = getState()[REDUCER_KEY];
      const pidNumber = parseInt(pid);
      const record = find(records, { pid: pidNumber });
      if (record) {
        resolve();
      } else {
        reject();
      }
    });
}
export function addToCollection(pid, waiting, done) {
  return (dispatch, getState) => {
    asyncXhrAuthedPost(
      '/ajax/add_fav.json',
      { pid },
      getState(),
    )
    .then(() => {
      dispatch(done);
    });
  };
}


export function removeFromCollection(pid, waiting, done) {
  return (dispatch, getState) => {
    asyncXhrAuthedPost(
      '/ajax/remove_fav.json',
      { pid },
      getState(),
    )
    .then(() => {
      dispatch(done);
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
