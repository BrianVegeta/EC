import { asyncXhrAuthedPost } from 'lib/xhr';
import { reduceDuplicateRecords } from 'lib/utils';

/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'CHAT_BOX';
const REDUCER_KEY = 'chatBox';
const SIZE = 20;
const DUPLICATE_KEY = 'id';


// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);

export const FETCHING = prefix('FETCHING');
export const FETCHED = prefix('FETCHED');
export const COUNT_RECURSIVE_TIMES = prefix('COUNT_RECURSIVE_TIMES');
export const RESET_RECURSIVE_TIMES = prefix('RESET_RECURSIVE_TIMES');
export const SET_CURRENT_USER = prefix('SET_CURRENT_USER');
export const RESET = prefix('RESET');


// =============================================
// = actions =
// =============================================

const fetching = expireFlag => ({
  type: FETCHING,
  expireFlag,
});

const fetched = logs => ({
  type: FETCHED,
  logs,
});

function checkExpire(logs, expireFlag) {
  return (dispatch, getState) => {
    if (expireFlag !== getState()[REDUCER_KEY].expireFlag) {
      return;
    }
    dispatch(fetched(logs));
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
export function fetchLogs(targetUid, recursiveRecords = []) {
  return (dispatch, getState) => {
    const { size, index, logs, recursiveTimes } = getState()[REDUCER_KEY];
    const requestParams = {
      target_uid: targetUid,
      index: (index + recursiveRecords.length),
      size: (size - recursiveRecords.length),
    };
    dispatch(countRecursiveTimes()); /* 增加 RECURSIVE 次數 */
    const expireFlag = Date.now();
    dispatch(fetching(expireFlag)); /* LOADING FETCH */
    /* API REQUEST */
    asyncXhrAuthedPost(
      '/ajax/chat/logs.json',
      requestParams,
      getState(),
    ).then((data) => {
      const reducedRecords = reduceDuplicateRecords(data, logs, DUPLICATE_KEY);
      /* RECURSIVE AGAIN */
      if (
        reducedRecords.length < data.length &&
        recursiveTimes <= RECURSIVE_LIMIT
      ) {
        dispatch(fetchLogs(targetUid, reducedRecords));
        return;
      }
      dispatch(resetRecursiveTimes()); /* RESET RECURSIVE FREQUENCY */
      /* CHANGE RECORDS IN REDUCER */
      dispatch(checkExpire(data.concat(recursiveRecords), expireFlag));
    });
  };
}

const setCurrentUser = ({ uid }) => ({
  type: SET_CURRENT_USER,
  uid,
});

export const changeChatTarget = ({ uid }) =>
  (dispatch) => {
    dispatch(setCurrentUser({ uid }));
    dispatch(fetchLogs(uid));
  };


// =============================================
// = reducer =
// =============================================
const initialState = {
  currentUser: null,

  expireFlag: null,
  isPaginable: true,
  isFetching: false,
  logs: [],
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
        isPaginable: action.logs.length === state.size,
        logs: state.logs.concat(action.logs),
        index: state.index + action.logs.length,
      });

    case COUNT_RECURSIVE_TIMES:
      return Object.assign({}, state, {
        recursiveTimes: state.recursiveTimes + 1,
      });

    case RESET_RECURSIVE_TIMES:
      return Object.assign({}, state, {
        recursiveTimes: 0,
      });

    case SET_CURRENT_USER:
      return Object.assign({}, state, {
        currentUser: { uid: action.uid },
      });

    case RESET:
      return initialState;

    default:
      return state;
  }
};
