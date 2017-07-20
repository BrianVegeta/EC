/* eslint-disable import/prefer-default-export */
// 彈跳視窗

import * as types from 'constants/actionTypes/popup';
import * as popupTypes from 'constants/popupTypes';

const openPopup = actions => ({
  type: types.OPEN,
  ...actions,
});

export function popupNewPassword(options, width) {
  return openPopup({
    renderType: popupTypes.NEW_PASSWORD,
    options,
    width,
  });
}

export function popupCheckPassword(options, width) {
  return openPopup({
    renderType: popupTypes.CHECK_PASSWORD,
    options,
    width,
  });
}

export function popupBankInfoSetup(options, width) {
  return openPopup({
    renderType: popupTypes.BANK_SETUP,
    options,
    width,
  });
}

export function popupAccessCheck(options, width) {
  return openPopup({
    renderType: popupTypes.ACCESS_CHECK,
    options,
    width,
  });
}

export const closePopup = () => ({
  type: types.CLOSE,
});
