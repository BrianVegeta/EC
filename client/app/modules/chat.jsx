/* eslint-disable import/prefer-default-export */
import {
  asyncXhrAuthedPost,
} from 'lib/xhr';

/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'CHAT';


// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);

const FETCHED_ROOMS = prefix('FETCHED_ROOMS');
const RESET = prefix('RESET');

// =============================================
// = actions =
// =============================================
const fetchedRooms = rooms => ({
  type: FETCHED_ROOMS,
  rooms,
});

export const fetchChatRoom = () =>
  (dispatch, getState) =>
    asyncXhrAuthedPost(
      '/ajax/sync_chat_rooms.json',
      { index: 0, size: 20 },
      getState(),
    ).then((data) => {
      dispatch(fetchedRooms(data));
    });


// =============================================
// = reducer =
// =============================================
const initialState = {
  rooms: [],
};

export default (state = initialState, action) => {
  switch (action.type) {

    case FETCHED_ROOMS:
      return Object.assign({}, state, { rooms: action.rooms });

    case RESET:
      return initialState;

    default:
      return state;
  }
};
