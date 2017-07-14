/* eslint-disable import/prefer-default-export */
const TYPE = 'OPTIONS';
const prefix = action => (
  `${TYPE}.${action}`
);

export const SET_BANKS = prefix('SET_BANKS');
export const CHANGE_BANK_BRANCHS = prefix('CHANGE_BANK_BRANCHS');
