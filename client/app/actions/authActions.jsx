/* eslint-disable import/prefer-default-export */

import * as types from 'constants/actionTypes/auth';
import * as AUTH_BY from 'constants/authBy';
import { browserHistory } from 'react-router';

import {
  fetchXhrDelete,
  fetchXhrPost,
  fetchXhrGet,
} from 'lib/xhr';

const doLogout = () => ({
  type: types.LOGOUT,
});
export function logout() {
  return (dispatch) => {
    fetchXhrDelete('/ajax/logout.json', () => {
      dispatch(doLogout());
    });
  };
}

const doLogin = currentUser => ({
  type: types.LOGIN,
  currentUser,
});

const changeCurrentUser = currentUser => ({
  type: types.CHANGE_CURRENT_USER,
  currentUser,
});

const registerFail = message => ({
  type: types.REGISTER_FAILED,
  message,
});

const verifyFail = message => ({
  type: types.VERIFY_FAILED,
  message,
});

const loginFail = message => ({
  type: types.LOGIN_FAILED,
  message,
});

const registerToVerify = () => ({
  type: types.CHANGE_REGISTER_STATE_VERIFING,
});

// 同步 USER 資料
export function syncCurrentUser() {
  return (dispatch) => {
    fetchXhrGet(
      '/ajax/auth/sync.json',
      (response) => {
        dispatch(changeCurrentUser(response.data));
      },
      () => {
        dispatch(doLogout());
      },
    );
  };
}

// EMAIL 註冊
export function registerByEmail({ email, password }) {
  return (dispatch) => {
    dispatch(registerFail(null));
    // TODO: FLASH MESSAGE
    fetchXhrPost(
      '/ajax/email_register.json',
      { email, password },
      () => {
        dispatch(registerToVerify());
      },
      (response) => {
        dispatch(registerFail(response.message));
      },
    );
  };
}
// PHONE 註冊
export function registerByPhone({ phone, password }) {
  return (dispatch) => {
    dispatch(registerFail(null));
    // TODO: FLASH MESSAGE
    fetchXhrPost(
      '/ajax/phone_register.json',
      { phone, password },
      () => {
        dispatch(registerToVerify());
      },
      (response) => {
        dispatch(registerFail(response.message));
      },
    );
  };
}
// EMAIL 驗證
export function verifyByEmail({ email, verifycode }) {
  return (dispatch) => {
    dispatch(verifyFail(null));
    // TODO: FLASH MESSAGE
    fetchXhrPost(
      '/ajax/email_verify.json',
      { email, verifycode },
      (response) => {
        const { user_profile } = response.data;
        dispatch(doLogin(user_profile));
      },
      (response) => {
        dispatch(verifyFail(response.message));
      },
    );
  };
}
// PHONE 驗證
export function verifyByPhone({ phone, sms }) {
  return (dispatch) => {
    dispatch(verifyFail(null));
    // TODO: FLASH MESSAGE
    fetchXhrPost(
      '/ajax/phone_verify.json',
      { phone, sms },
      (response) => {
        dispatch(doLogin(response.data.user_profile));
      },
      (response) => {
        dispatch(verifyFail(response.message));
      },
    );
  };
}
// EMAIL 登入
export function loginByEmail({ email, password }) {
  return (dispatch) => {
    fetchXhrPost(
      '/ajax/email_login.json',
      { email, password },
      (response) => {
        dispatch(doLogin(response.data.user_profile));
        // REDIRECT
        browserHistory.push('/');
      },
      (response) => {
        dispatch(loginFail(response.message));
      },
    );
  };
}
// PHONE 登入
export function loginByPhone({ phone, password }) {
  return (dispatch) => {
    fetchXhrPost(
      '/ajax/phone_login.json',
      { phone, password },
      (response) => {
        dispatch(doLogin(response.data.user_profile));
      },
      (response) => {
        dispatch(loginFail(response.message));
      },
    );
  };
}
// FACEBOOK 登入
export function loginFacebook({ userID, accessToken, picture: { data: { url } } }) {
  return (dispatch) => {
    fetchXhrPost(
      '/ajax/facebook_login_callback.json',
      {
        fb_id: userID,
        access_token: accessToken,
        avatar_url: url,
      },
      (response) => {
        dispatch(doLogin(response.data.user_profile));
      },
      (response) => {
        dispatch(loginFail(response.message));
      },
    );
  };
}

// COLUMN CHANGE
export const updateEmail = email => ({
  type: types.CHANGE_EMAIL,
  email,
});

export const updatePhone = phone => ({
  type: types.CHANGE_PHONE,
  phone,
});

export const updatePassword = password => ({
  type: types.CHANGE_PASSWORD,
  password,
});

export const updatePasswordConfirmation = passwordConfirmation => ({
  type: types.CHANGE_PASSWORD_CONFIRMATION,
  passwordConfirmation,
});

export const updateNickname = nickname => ({
  type: types.CHANGE_NICKNAME,
  nickname,
});

export const updateVerifyCode = verifyCode => ({
  type: types.CHANGE_VERIFY_CODE,
  verifyCode,
});

// REGISTER BY
const changeRegisterBy = registerBy => ({
  type: types.CHANGE_REGISTER_BY,
  registerBy,
});
export const switchEmailRegistration = () => changeRegisterBy(AUTH_BY.EMAIL);
export const switchPhoneRegistration = () => changeRegisterBy(AUTH_BY.PHONE);

// LOGIN BY
const changeLoginBy = loginBy => ({
  type: types.CHANGE_LOGIN_BY,
  loginBy,
});
export const switchEmailLogin = () => changeLoginBy(AUTH_BY.EMAIL);
export const switchPhoneLogin = () => changeLoginBy(AUTH_BY.PHONE);
