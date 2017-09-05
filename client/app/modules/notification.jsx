/* eslint-disable import/prefer-default-export */
import { asyncXhrAuthedPost } from 'lib/xhr';

// =============================================
// = settings =
// =============================================
export const REDUCER_KEY = 'notification';
const prefix = action => (`NOTIFICATION.${action}`);

export const UPDATE_NOTIFY = prefix('UPDATE_NOTIFY');
export const UPDATE_CNOTIFY = prefix('UPDATE_CNOTIFY');

// =============================================
// = ACTION TYPE =
// =============================================

export const updateNotify = notifyData => ({
  type: UPDATE_NOTIFY,
  notifyData,
});

export const updateCNotify = notifyCData => ({
  type: UPDATE_CNOTIFY,
  notifyCData,
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
    asyncXhrAuthedPost(
      '/ajax/get_notify_contract.json',
      {},
      getState(),
    ).then((responseData) => {
      dispatch(updateCNotify(responseData));
    });
  };
}

// =============================================
// = REDUCER =
// =============================================

const initialState = {
  notifyData: [],
  notifyCData: {
    owner_unread_count: 0,
    lessee_unread_count: 0,
  },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NOTIFY:
      return Object.assign({}, state, { notifyData: action.notifyData });

    case UPDATE_CNOTIFY:
      return Object.assign({}, state, { notifyCData: action.notifyCData });

    default:
      return state;
  }
};
