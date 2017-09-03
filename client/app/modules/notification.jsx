/* eslint-disable import/prefer-default-export */
import { asyncXhrAuthedPost } from 'lib/xhr';

// =============================================
// = settings =
// =============================================
export const REDUCER_KEY = 'notification';
const prefix = action => (`NOTIFICATION.${action}`);

export const UPDATE_NOTIFY = prefix('UPDATE_NOTIFY');

// =============================================
// = ACTION TYPE =
// =============================================

export const updateNotify = notifyData => ({
  type: UPDATE_NOTIFY,
  notifyData,
});

export function getNotitications() {
  return (dispatch, getState) => {
    asyncXhrAuthedPost(
      '/ajax/get_unread_notify.json',
      { size: 1 },
      getState(),
    ).then((responseData) => {
      dispatch(updateNotify(responseData));
    });
  };
}

// =============================================
// = REDUCER =
// =============================================

const initialState = {
  notifyData: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NOTIFY:
      return Object.assign({}, state, { notifyData: action.notifyData });
    default:
      return state;
  }
};
