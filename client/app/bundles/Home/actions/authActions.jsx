/* eslint-disable import/prefer-default-export */
import * as TYPES from '../constants/actionTypes';

export const setLoginStatus = isLogin => ({
  type: TYPES.AUTH_SET_LOGIN_STATUS,
  isLogin,
});
