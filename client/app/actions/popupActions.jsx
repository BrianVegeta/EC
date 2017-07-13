/* eslint-disable import/prefer-default-export */
// 彈跳視窗

import * as types from 'constants/actionTypes/popup';
import * as renderTypes from 'constants/popupTypes';
// import { fetchXhrDelete, fetchXhrPost, fetchXhrGet } from '../lib/xhr';

const openPopup = actions => ({
  type: types.OPEN,
  ...actions,
});

export function popupNewPassword(options, width) {
  return openPopup({
    renderType: renderTypes.NEW_PASSWORD,
    options,
    width,
  });
}

export function popupCheckPassword(options, width) {
  return openPopup({
    renderType: renderTypes.CHECK_PASSWORD,
    options,
    width,
  });
}

export function popupBankInfoSetup(options, width) {
  return openPopup({
    renderType: renderTypes.BANK_SETUP,
    options,
    width,
  });
}

export const closePopup = () => ({
  type: types.CLOSE,
});
