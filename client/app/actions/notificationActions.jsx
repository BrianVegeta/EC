/* eslint-disable import/prefer-default-export */
import * as TYPES from '../constants/actionTypes/notification';
import { fetchGetRequest } from '../lib/xhr';

export const setBoxItems = boxItems => ({
  type: TYPES.SET_NOTIFICATIONS,
  boxItems,
});

export function getNotitications() {
  return (dispatch) => {
    fetchGetRequest('/ajax/auth/notifications.json', (response) => {
      const { success, data } = response;
      if (success) {
        dispatch(setBoxItems(data));
      }
    });
  };
}
