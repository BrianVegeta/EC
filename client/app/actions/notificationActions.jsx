/* eslint-disable import/prefer-default-export */
import * as TYPES from '../constants/actionTypes/notification';
import { fetchXhrAuthedGet } from '../lib/xhr';

export const setBoxItems = boxItems => ({
  type: TYPES.SET_NOTIFICATIONS,
  boxItems,
});

export function getNotitications() {
  return (dispatch, getState) => {
    fetchXhrAuthedGet(
      '/ajax/auth/notifications.json',
      getState(),
      (response) => {
        dispatch(setBoxItems(response.data));
      },
    );
  };
}
