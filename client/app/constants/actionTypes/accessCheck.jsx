/* eslint-disable import/prefer-default-export */
const TYPE = 'ACCESS_CHECK';
const prefix = action => `${TYPE}.${action}`;

export const EXIST_CHECKING = prefix('EXIST_CHECKING');
export const EXIST_CHECKED = prefix('EXIST_CHECKED');
export const CHANGE_STATE = prefix('CHANGE_STATE');
export const CHECKING = prefix('CHECKING');
export const CHECKED = prefix('CHECKED');
export const RESET = prefix('RESET');
