/* eslint-disable import/prefer-default-export */
const TYPE = 'POPUP_BANK_SETUP';
const prefix = action => (
  `${TYPE}.${action}`
);

export const CHANGE_DATA = prefix('CHANGE_DATA');
export const RESET = prefix('RESET');
