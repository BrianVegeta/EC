import { asyncXhrPost } from 'lib/xhr';
import { reduceDuplicateRecords } from 'lib/utils';

/* =============================================>>>>>
= userprofile =
===============================================>>>>>*/
const ACTION_PREFIX = 'MY.ITEM';
const REDUCER_KEY = 'myItem';
const SIZE = 9;


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

const fetched = records => ({
  type: FETCHED,
  records,
});

function checkExpire(records, expireFlag) {
  return (dispatch, getState) => {
    if (expireFlag !== getState()[REDUCER_KEY].expireFlag) {
      return;
    }
    dispatch(fetched(records));
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
export function fetchItems(categoryID, recursiveRecords = []) {
  return (dispatch, getState) => {
    const { currentUser } = getState().auth;
    const {
      size,
      index,
      records,
      recursiveTimes,
    } = getState()[REDUCER_KEY];

    const requestParams = {
      index: (index + recursiveRecords.length),
      size: (size - recursiveRecords.length),
      category_id: categoryID,
      target_uid: currentUser.uid,
      sort: {
        column: 'time',
        type: 'desc',
      },
    };

    /* 增加 RECURSIVE 次數 */
    dispatch(countRecursiveTimes());
    /* LOADING FETCH */
    const expireFlag = Date.now();
    dispatch(fetching(expireFlag));
    /* API REQUEST */
    asyncXhrPost(
      '/ajax/item/list.json',
      requestParams,
    )
    .then((data) => {
      const reducedRecords = reduceDuplicateRecords(data, records, 'pid');
      if (reducedRecords.length < data.length && recursiveTimes <= RECURSIVE_LIMIT) {
        /* RECURSIVE AGAIN */
        dispatch(fetchItems(
          categoryID, currentUser.uid, reducedRecords,
        ));
        return;
      }
      /* RESET RECURSIVE FREQUENCY */
      dispatch(resetRecursiveTimes());
      /* CHANGE RECORDS IN REDUCER */
      dispatch(checkExpire(data.concat(recursiveRecords), expireFlag));
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
