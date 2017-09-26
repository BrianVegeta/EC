import { fromJS } from 'immutable';
import { asyncXhrAuthedPost } from 'lib/xhr';
import { reduceDuplicateRecords } from 'lib/utils';

/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'CHAT_BOX';
export const REDUCER_KEY = 'chatBox';
const SIZE = 60;
const DUPLICATE_KEY = 'id';


// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);

export const CHANGE_INPUT = prefix('CHANGE_INPUT');
export const SET_ITEMS = prefix('SET_ITEMS');
export const FETCHING = prefix('FETCHING');
export const FETCHED = prefix('FETCHED');
export const COUNT_RECURSIVE_TIMES = prefix('COUNT_RECURSIVE_TIMES');
export const RESET_RECURSIVE_TIMES = prefix('RESET_RECURSIVE_TIMES');
export const SET_CURRENT_ROOM = prefix('SET_CURRENT_ROOM');
export const ADD_MESSAGE_TO_LOGS = prefix('ADD_MESSAGE_TO_LOGS');
export const UPDATE_MESSAGE_STATES = prefix('UPDATE_MESSAGE_STATES');
export const UPDATE_MESSAGE_RECEIVED = prefix('UPDATE_MESSAGE_RECEIVED');
export const UPDATE_MESSAGES_READ = prefix('UPDATE_MESSAGES_READ');
export const RESET = prefix('RESET');


// =============================================
// = actions =
// =============================================
export const changeInput = input => ({
  type: CHANGE_INPUT,
  input,
});

export const setItems = records => ({
  type: SET_ITEMS,
  records,
});

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

const setCurrentRoom = roomWithUser => ({
  type: SET_CURRENT_ROOM,
  roomWithUser,
});

export const addMessageToLogs = messageJson => ({
  type: ADD_MESSAGE_TO_LOGS,
  messageJson,
});

export const updateMessageStates = (standardId, states) => ({
  type: UPDATE_MESSAGE_STATES,
  standardId,
  states,
});

export const changeChatTarget = (room, user) =>
  (dispatch) => {
    dispatch(reset());
    dispatch(setCurrentRoom(Object.assign({}, room, user)));
    dispatch(fetchLogs(user.uid));
  };

export const updateMessagesRead = uid =>
  (dispatch, getState) => {
    const { currentRoom: { uid: currentUid } } = getState()[REDUCER_KEY];
    if (currentUid.toLowerCase() !== uid.toLowerCase()) return;
    dispatch({ type: UPDATE_MESSAGES_READ });
  };


// =============================================
// = reducer =
// =============================================
const initialState = {
  currentRoom: null,
  input: '',
  items: {
    isFetching: false,
    records: [],
  },

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

    case CHANGE_INPUT:
      return Object.assign({}, state, { input: action.input });

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

    case SET_CURRENT_ROOM:
      return Object.assign({}, state, {
        currentRoom: action.roomWithUser,
      });

    case SET_ITEMS:
      return fromJS(state).updateIn(
        ['items', 'records'],
        () => action.records,
      ).toJS();

    case ADD_MESSAGE_TO_LOGS:
      return fromJS(state).updateIn(
        ['logs'],
        logs => logs.unshift(action.messageJson),
      ).toJS();

    case UPDATE_MESSAGE_STATES:
      return fromJS(state).updateIn(
        ['logs'],
        logs => logs.update(
          logs.findIndex(log => (log.get('standardId') === action.standardId)),
          log => log.merge(action.states),
        ),
      ).toJS();

    case UPDATE_MESSAGES_READ:
      return fromJS(state).updateIn(
        ['logs'],
        logs => logs.map(
          log => log.merge({ is_read: true, is_receive: true }),
        ),
      ).toJS();

    case RESET:
      return initialState;

    default:
      return state;
  }
};
