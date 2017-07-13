/* eslint-disable import/prefer-default-export */
const TYPE = 'SECRECY_VERIFICATION';
const prefix = action => (
  `${TYPE}.${action}`
);

export const CHANGE_PASSWORD = prefix('CHANGE_PASSWORD');
export const CHANGE_BANK_INFO = prefix('CHANGE_BANK_INFO');
