/* eslint-disable import/prefer-default-export */

import * as types from 'constants/actionTypes/alertPopup';
// import { fetchXhrDelete, fetchXhrPost, fetchXhrGet } from '../lib/xhr';

export const openAlertPopup = actions => ({
  type: types.OPEN,
  ...actions,
});

export function popupCreatePassword(options, width) {
  return openAlertPopup({
    renderType: 'CREATE_PASSWORD',
    options,
    width,
  });
}

export const closeAlertPopup = () => ({
  type: types.CLOSE,
});
