/* eslint-disable import/prefer-default-export */
// 彈跳視窗

import * as types from 'constants/actionTypes/popup';

export const NEW_PASSWORD = 'NEW_PASSWORD';
export const CHECK_PASSWORD = 'CHECK_PASSWORD';
export const BANK_SETUP = 'BANK_SETUP';
export const ACCESS_CHECK = 'ACCESS_CHECK';
export const PUBLISH_ENTRY = 'PUBLISH_ENTRY';

const openPopup = actions => ({
  type: types.OPEN,
  ...actions,
});

export function popupBankInfoSetup(options, width) {
  return openPopup({
    renderType: BANK_SETUP,
    options,
    width,
  });
}

export function popupAccessCheck(options, width) {
  return openPopup({
    renderType: ACCESS_CHECK,
    options,
    width,
  });
}

export const closePopup = () => ({
  type: types.CLOSE,
});
