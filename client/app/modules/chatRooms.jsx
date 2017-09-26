/* eslint-disable camelcase */
import { fromJS } from 'immutable';
import { findIndex } from 'lodash';
import { asyncXhrAuthedPost } from 'lib/xhr';
import { reduceDuplicateRecords } from 'lib/utils';
import { now } from 'lib/time';
import {
  REDUCER_KEY as CHAT_BOX_REDUCER_KEY,
  changeChatTarget,
} from 'modules/chatBox';
import {
  openChat,
} from 'modules/chat';

/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'CHAT_ROOMS';
export const REDUCER_KEY = 'chatRooms';
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
const ADD_NEW_ROOM = prefix('ADD_NEW_ROOM');
const MOVE_TO_TOP = prefix('MOVE_TO_TOP');
const CHANGE_SEARCH_INPUT = prefix('CHANGE_SEARCH_INPUT');


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
    // if (rooms.length > 0) {
    //   const [room] = rooms;
    //   const { members: [user] } = room;
    //   dispatch(changeChatTarget(room, user));
    // }
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

export const emptyUnreadCount = uid => ({
  type: EMPTY_UNREAD_COUNT,
  uid,
});

export const updateLastMessage = (message, standardId, { uid }) =>
  (dispatch, getState) => {
    const { currentRoom } = getState()[CHAT_BOX_REDUCER_KEY];
    const unreadCount = (
      currentRoom &&
      currentRoom.uid.toLowerCase() === uid.toLowerCase()
    ) ? 0 : 1;
    dispatch({
      type: UPDATE_LAST_MESSAGE,
      message,
      standardId,
      uid,
      unreadCount,
    });
  };

export const addToChatRoom = ({ uid, name, picture }) =>
  (dispatch, getState) => {
    const { rooms } = getState()[REDUCER_KEY];
    const index = findIndex(rooms, room =>
      room.members[0].uid.toLowerCase() === uid.toLowerCase(),
    );
    const user = { uid, name, picture };
    if (index >= 0) {
      const room = rooms[index];
      dispatch({ type: MOVE_TO_TOP, index, room });
      dispatch(changeChatTarget(room, user));
    } else {
      const room = {
        last_message: '',
        last_message_create_time: now(),
        members: [user],
        room_id: null,
        room_type: 'CHAT',
        unread_message_count: 0,
      };
      dispatch({ type: ADD_NEW_ROOM, room });
      dispatch(changeChatTarget(room, user));
    }
    dispatch(openChat(true));
  };

export const changeSearchInput = value => ({
  type: CHANGE_SEARCH_INPUT,
  value,
});


// =============================================
// = reducer =
// =============================================
const initialState = {
  searchInput: null,
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
        (rooms) => {
          const updateIndex = rooms.findIndex((room) => {
            const member = room.get('members').get(0);
            return member.get('uid').toLowerCase() === action.uid.toLowerCase();
          });
          if (updateIndex < 0) return rooms;
          return rooms.update(
            updateIndex,
            room => room.merge({ unread_message_count: 0 }),
          );
        },
      ).toJS();

    case UPDATE_LAST_MESSAGE:
      return fromJS(state).updateIn(
        ['rooms'],
        (rooms) => {
          const { standardId } = action;
          const updateIndex = rooms.findIndex((room) => {
            const member = room.get('members').get(0);
            const standardIds = room.get('standardIds');
            return (
              member.get('uid') === action.uid.toLowerCase() &&
              !(standardIds && standardIds.contains(standardId))
            );
          });
          if (updateIndex < 0) return rooms;
          return rooms.update(
            updateIndex,
            (room) => {
              const unread_message_count = room.get('unread_message_count');
              const standardIds = room.get('standardIds');
              return room.merge({
                last_message: action.message,
                unread_message_count: unread_message_count + action.unreadCount,
                standardIds: standardIds ? standardIds.push(standardId) : [standardId],
                last_message_create_time: now(),
              });
            },
          );
        },
      ).toJS();

    case ADD_NEW_ROOM:
      return fromJS(state).updateIn(
        ['rooms'],
        rooms => rooms.unshift(fromJS(action.room)),
      ).toJS();

    case MOVE_TO_TOP:
      return fromJS(state).updateIn(
        ['rooms'],
        rooms => rooms.delete(action.index).unshift(action.room),
      ).toJS();

    case CHANGE_SEARCH_INPUT:
      return Object.assign({}, state, { searchInput: action.value });


    default:
      return state;
  }
};
