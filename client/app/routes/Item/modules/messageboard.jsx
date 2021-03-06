import { asyncXhrPost, asyncXhrAuthedPost } from 'lib/xhr';
import { reduceDuplicateRecords } from 'lib/utils';

/* =============================================>>>>>
= userprofile =
===============================================>>>>>*/
const ACTION_PREFIX = 'ITEM.MESSAGEBOARD';
const REDUCER_KEY = 'messageboard';
const AUTH_REDUCER_KEY = 'auth';
const DUPLICATE_KEY = 'id';
const SIZE = 10;


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
export const TARGET_OWNER = 'OWNER';
export const TARGET_LESSEE = 'LESSEE';
export function fetchRecords(pid, target = TARGET_OWNER, recursiveRecords = []) {
  return (dispatch, getState) => {
    const {
      size,
      index,
      records,
      recursiveTimes,
    } = getState()[REDUCER_KEY];

    const requestParams = {
      index: (index + recursiveRecords.length),
      size: (size - recursiveRecords.length),
      pid,
    };

    const expireFlag = Date.now();
    /* LOADING FETCH */
    dispatch(fetching(expireFlag));
    /* 增加 RECURSIVE 次數 */
    dispatch(countRecursiveTimes());
    /* API REQUEST */
    asyncXhrPost(
      {
        [TARGET_OWNER]: '/ajax/get_message_board.json',
        [TARGET_LESSEE]: '/ajax/get_message_board.json',
      }[target],
      requestParams,
    )
    .then((data) => {
      const reducedRecords = reduceDuplicateRecords(data, records, DUPLICATE_KEY);

      if (reducedRecords.length < data.length && recursiveTimes <= RECURSIVE_LIMIT) {
        /* RECURSIVE AGAIN */
        dispatch(fetchRecords(pid, target, reducedRecords));
        return;
      }
      /* RESET RECURSIVE FREQUENCY */
      dispatch(resetRecursiveTimes());
      /* CHANGE RECORDS IN REDUCER */
      dispatch(checkExpire(data.concat(recursiveRecords), expireFlag));
    });
  };
}

// export function addMessage(pid, message) {
//   return (dispatch, getState) => {
//     const {
//       isLogin,
//     } = getState()[AUTH_REDUCER_KEY];
//     if (!(isLogin)) {
//       browserHistory.push(loginPath);
//       return;
//     }
//     const expireFlag = Date.now();
//     dispatch(fetching(expireFlag));
//
//     asyncXhrAuthedPost(
//       '/ajax/add_message.json',
//       { pid, message },
//       getState(),
//     ).then(() => {
//       dispatch(reset());
//       dispatch(fetchRecords(pid));
//     });
//   };
// }

export function addMessage(pid, message) {
  return (dispatch, getState) =>
    new Promise((resolve) => {
      const {
        isLogin,
      } = getState()[AUTH_REDUCER_KEY];
      if (!(isLogin)) {
        resolve({ redirect: true });
        return;
      }
      const expireFlag = Date.now();
      dispatch(fetching(expireFlag));

      asyncXhrAuthedPost(
        '/ajax/add_message.json',
        { pid, message },
        getState(),
      ).then(() => {
        dispatch(reset());
        dispatch(fetchRecords(pid));
      });
    });
}

// =============================================
// = reducer =
// =============================================
const initialState = {
  expireFlag: null,
  isPaginable: true,
  isFetching: false,
  recursiveTimes: 0,
  records: [],
  size: SIZE,
  index: 0,
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
