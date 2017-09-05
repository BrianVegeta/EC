import { asyncXhrAuthedPost } from 'lib/xhr';
import { reduceDuplicateRecords } from 'lib/utils';

/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'CHAT_ROOMS';
const REDUCER_KEY = 'chatRooms';
const SIZE = 20;
const DUPLICATE_KEY = 'room_id';


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

const fetched = rooms => ({
  type: FETCHED,
  rooms,
});

function checkExpire(rooms, expireFlag) {
  return (dispatch, getState) => {
    if (expireFlag !== getState()[REDUCER_KEY].expireFlag) {
      return;
    }
    dispatch(fetched(rooms));
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
export function fetchRooms(recursiveRecords = []) {
  return (dispatch, getState) => {
    const { size, index, rooms, recursiveTimes } = getState()[REDUCER_KEY];
    const requestParams = {
      index: (index + recursiveRecords.length),
      size: (size - recursiveRecords.length),
    };
    dispatch(countRecursiveTimes()); /* 增加 RECURSIVE 次數 */
    const expireFlag = Date.now();
    dispatch(fetching(expireFlag)); /* LOADING FETCH */
    /* API REQUEST */
    asyncXhrAuthedPost(
      '/ajax/sync_chat_rooms.json',
      requestParams,
      getState(),
    ).then((data) => {
      const reducedRecords = reduceDuplicateRecords(data, rooms, DUPLICATE_KEY);
      /* RECURSIVE AGAIN */
      if (
        reducedRecords.length < data.length &&
        recursiveTimes <= RECURSIVE_LIMIT
      ) {
        dispatch(fetchRooms(reducedRecords));
        return;
      }
      dispatch(resetRecursiveTimes()); /* RESET RECURSIVE FREQUENCY */
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
  rooms: [],
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
        isPaginable: action.rooms.length === state.size,
        rooms: state.rooms.concat(action.rooms),
        index: state.index + action.rooms.length,
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
