/* eslint-disable import/prefer-default-export */
import * as TYPES from '../constants/actionTypes/notification';
import { asyncXhrAuthedPost } from '../lib/xhr';

export const setBoxItems = boxItems => ({
  type: TYPES.SET_NOTIFICATIONS,
  boxItems,
});

export function getNotitications() {
  return (dispatch, getState) => {
    asyncXhrAuthedPost(
      '/ajax/get_unread_notify.json',
      { size: 3 },
      getState(),
    ).then((responseData) => {
      dispatch(setBoxItems(responseData));
    });
  };
}
