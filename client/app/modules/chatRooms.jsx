import { fromJS } from 'immutable';
import { asyncXhrAuthedPost } from 'lib/xhr';
import { reduceDuplicateRecords } from 'lib/utils';
import { now } from 'lib/time';
import {
  REDUCER_KEY as CHAT_BOX_REDUCER_KEY,
  changeChatTarget,
} from 'modules/chatBox';

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
const EMPTY_UNREAD_COUNT = prefix('EMPTY_UNREAD_COUNT');
const UPDATE_LAST_MESSAGE = prefix('UPDATE_LAST_MESSAGE');


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
    if (rooms.length > 0) {
      const [room] = rooms;
      const { members: [user] } = room;
      dispatch(changeChatTarget(room, user));
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

export const emptyUnreadCount = roomId => ({
  type: EMPTY_UNREAD_COUNT,
  roomId,
});

export const updateLastMessage = (message, roomId) =>
  (dispatch, getState) => {
    const { currentRoom } = getState()[CHAT_BOX_REDUCER_KEY];
    const unreadCount = (currentRoom.room_id === roomId) ? 0 : 1;
    console.log(unreadCount);
    dispatch({
      type: UPDATE_LAST_MESSAGE,
      message,
      roomId,
      unreadCount,
    });
  };


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

    case EMPTY_UNREAD_COUNT:
      return fromJS(state).updateIn(
        ['rooms'],
        rooms => rooms.update(
          rooms.findIndex(room => (room.get('room_id') === action.roomId)),
          room => room.merge({ unread_message_count: 0 }),
        ),
      ).toJS();

    case UPDATE_LAST_MESSAGE:
      return fromJS(state).updateIn(
        ['rooms'],
        rooms => rooms.update(
          rooms.findIndex(room => (room.get('room_id') === action.roomId)),
          room => room.merge({
            last_message: action.message,
            unread_message_count: (room.get('unread_message_count') + action.unreadCount),
            last_message_create_time: now(),
          }),
        ),
      ).toJS();

    default:
      return state;
  }
};
