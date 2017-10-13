import { List } from 'immutable';
import { asyncXhrPost, asyncXhrAuthedPost } from 'lib/xhr';
import { reduceDuplicateRecords } from 'lib/utils';
import { REDUCER_KEY as AUTH_REDUCER_KEY } from 'modules/auth';

/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'MY.WISH';
const REDUCER_KEY = 'myWish';
const SIZE = 9;
const DUPLICATE_ID = 'id';


// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);

export const DELETING = prefix('DELETING');
export const DELETED = prefix('DELETED');
export const FETCHING = prefix('FETCHING');
export const FETCHED = prefix('FETCHED');
export const COUNT_RECURSIVE_TIMES = prefix('COUNT_RECURSIVE_TIMES');
export const RESET_RECURSIVE_TIMES = prefix('RESET_RECURSIVE_TIMES');
export const RESET = prefix('RESET');


// =============================================
// = actions =
// =============================================
const fetching = expireFlag => ({
  type: FETCHING,
  expireFlag,
});

const fetched = (records, lastId) => ({
  type: FETCHED,
  records,
  lastId,
});

function checkExpire(records, expireFlag, lastId) {
  return (dispatch, getState) => {
    if (expireFlag !== getState()[REDUCER_KEY].expireFlag) {
      return;
    }
    dispatch(fetched(records, lastId));
  };
}

const countRecursiveTimes = () => ({
  type: COUNT_RECURSIVE_TIMES,
});

const resetRecursiveTimes = () => ({
  type: RESET_RECURSIVE_TIMES,
});

export const reset = () => ({
  type: RESET,
});


const RECURSIVE_LIMIT = 10;
/**
 *
 * @index
 * @size
 *
 * recursive pagin items
 */
export function fetchRecords(uid, recursiveRecords = [], fetchSize = null) {
  return (dispatch, getState) => {
    const { currentUser } = getState().auth;
    const {
      size,
      index,
      records,
      recursiveTimes,
      lastId,
    } = getState()[REDUCER_KEY];
    const requestParams = {
      index: (index + recursiveRecords.length),
      size: ((fetchSize || size) - recursiveRecords.length),
      uid: currentUser.uid,
    };

    /* 增加 RECURSIVE 次數 */
    dispatch(countRecursiveTimes());
    /* LOADING FETCH */
    const expireFlag = Date.now();
    dispatch(fetching(expireFlag));
    /* API REQUEST */
    asyncXhrPost(
      '/ajax/get_wish_pond.json',
      requestParams,
    )
    .then((data) => {
      const reducedRecords = reduceDuplicateRecords(data, records, DUPLICATE_ID);
      if (reducedRecords.length < data.length && recursiveTimes <= RECURSIVE_LIMIT) {
        /* RECURSIVE AGAIN */
        dispatch(fetchRecords(uid, reducedRecords, fetchSize));
        return;
      }
      /* RESET RECURSIVE FREQUENCY */
      dispatch(resetRecursiveTimes());
      /* CHANGE RECORDS IN REDUCER */
      dispatch(checkExpire(data.concat(recursiveRecords), expireFlag, lastId));
    });
  };
}

const deleting = () => ({
  type: DELETING,
});

const deleted = id => ({
  type: DELETED,
  id,
});

export const remove = id =>
  (dispatch, getState) => {
    const { currentUser: { uid } } = getState()[AUTH_REDUCER_KEY];
    dispatch(deleting());
    asyncXhrAuthedPost(
      '/ajax/wish/remove.json',
      { id },
      getState(),
    ).then(() => {
      dispatch(deleted(id));
      setTimeout(() => {
        dispatch(fetchRecords(uid, [], 1));
      }, 100);
    });
  };


// =============================================
// = reducer =
// =============================================
const initialState = {
  expireFlag: null,
  isDeleting: false,
  isPaginable: true,
  isFetching: false,
  records: [],
  size: SIZE,
  index: 0,
  lastId: null,
  recursiveTimes: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETING:
      return Object.assign({}, state, {
        isDeleting: true,
      });

    case DELETED: {
      const recordList = List(state.records);
      const deleteIndex = recordList.findIndex(record => record.id === action.id);
      return Object.assign({}, state, {
        isDeleting: false,
        index: state.index - 1,
        records: recordList.delete(deleteIndex).toJS(),
      });
    }

    case FETCHING:
      return Object.assign({}, state, {
        isFetching: true,
        expireFlag: action.expireFlag,
      });

    case FETCHED:
      return Object.assign({}, state, {
        isFetching: false,
        isPaginable: action.records.length === state.size,
        records: state.records.concat(action.records),
        index: state.index + action.records.length,
        lastId: action.lastId,
      });

    case COUNT_RECURSIVE_TIMES:
      return Object.assign({}, state, {
        recursiveTimes: state.recursiveTimes + 1,
      });

    case RESET_RECURSIVE_TIMES:
      return Object.assign({}, state, {
        recursiveTimes: 0,
      });

    case RESET:
      return initialState;

    default:
      return state;
  }
};
