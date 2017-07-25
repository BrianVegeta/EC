/* eslint-disable import/prefer-default-export */
const TYPE = 'AUTH';
const prefix = action => (
  `${TYPE}.${action}`
);

export const LOGOUT = prefix('LOGOUT');
export const LOGIN = prefix('LOGIN');
export const LOADING = prefix('LOADING');
export const LOADED = prefix('LOADED');
export const CHANGE_CURRENT_USER = prefix('CHANGE_CURRENT_USER');
export const CHANGE_REGISTER_STATE_VERIFING = prefix('CHANGE_REGISTER_STATE_VERIFING');
// CALLBACKS
export const REGISTER_FAILED = prefix('REGISTER_FAILED');
export const VERIFY_FAILED = prefix('VERIFY_FAILED');
export const LOGIN_FAILED = prefix('LOGIN_FAILED');
// COLUMN CHANGE
export const CHANGE_FORM = prefix('CHANGE_FORM');
// AUTH BY
export const CHANGE_REGISTER_BY = prefix('CHANGE_REGISTER_BY');
export const CHANGE_LOGIN_BY = prefix('CHANGE_LOGIN_BY');
