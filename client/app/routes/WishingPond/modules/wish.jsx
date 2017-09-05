import { asyncXhrPost } from 'lib/xhr';
import { reduceDuplicateRecords } from 'lib/utils';
import {
  REDUCER_KEY as FILTER_REDUCER_KEY,
} from 'modules/filter';

/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'WISH';
export const REDUCER_KEY = 'wish';
const SIZE = 18;
const DUPLICATE_ID = 'id';


// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);

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
export function fetchRecords(recursiveRecords = []) {
  return (dispatch, getState) => {
    const {
      size,
      index,
      records,
      recursiveTimes,
      lastId,
    } = getState()[REDUCER_KEY];
    const {
      locations,
    } = getState()[FILTER_REDUCER_KEY];
    const requestParams = {
      index: (index + recursiveRecords.length),
      size: (size - recursiveRecords.length),
      // last_id: lastId,
      locations: locations.map(city => ({ city, area: '' })),
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
      if (
        reducedRecords.length < data.length &&
        recursiveTimes <= RECURSIVE_LIMIT
      ) {
        /* RECURSIVE AGAIN */
        dispatch(fetchRecords(reducedRecords));
        return;
      }
      /* RESET RECURSIVE FREQUENCY */
      dispatch(resetRecursiveTimes());
      /* CHANGE RECORDS IN REDUCER */
      dispatch(checkExpire(data.concat(recursiveRecords), expireFlag, lastId));
    });
  };
}


// =============================================
// = reducer =
// =============================================
const initialState = {
  expireFlag: null,
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
