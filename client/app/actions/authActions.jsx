/* eslint-disable import/prefer-default-export */

import * as types from 'constants/actionTypes/auth';
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

const setLoading = () => ({
  type: types.LOADING,
});

const setLoaded = () => ({
  type: types.LOADED,
});

// COLUMN CHANGE
export const changeForm = dataChange => ({
  type: types.CHANGE_FORM,
  dataChange,
});

// REGISTER BY
export const changeRegisterBy = registerBy => ({
  type: types.CHANGE_REGISTER_BY,
  registerBy,
});

// LOGIN BY
export const changeLoginBy = loginBy => ({
  type: types.CHANGE_LOGIN_BY,
  loginBy,
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
    dispatch(setLoading());
    fetchXhrPost(
      '/ajax/email_register.json',
      { email, password },
      () => {
        dispatch(registerToVerify());
        dispatch(registerFail(null));
        dispatch(setLoaded());
      },
      (response) => {
        dispatch(registerFail(response.message));
        dispatch(setLoaded());
      },
    );
  };
}
// PHONE 註冊
export function registerByPhone({ phone, password }) {
  return (dispatch) => {
    dispatch(setLoading());
    fetchXhrPost(
      '/ajax/phone_register.json',
      { phone, password },
      () => {
        dispatch(registerToVerify());
        dispatch(registerFail(null));
        dispatch(setLoaded());
      },
      (response) => {
        dispatch(registerFail(response.message));
        dispatch(setLoaded());
      },
    );
  };
}
// EMAIL 驗證
export function verifyEmail({ email, verifycode, password, name }) {
  return (dispatch) => {
    dispatch(setLoading());
    fetchXhrPost(
      '/ajax/email_verify.json',
      { email, verifycode, password, name },
      (response) => {
        const { user_profile } = response.data;
        dispatch(doLogin(user_profile));
        dispatch(verifyFail(null));
        browserHistory.push('/');
        dispatch(setLoaded());
      },
      (response) => {
        dispatch(verifyFail(response.message));
        dispatch(setLoaded());
      },
    );
  };
}
/* PHONE 重發驗證 */
export function resendEmailVerification({ email }) {
  return (dispatch) => {
    dispatch(setLoading());
    fetchXhrPost(
      '/ajax/email_verify_resend.json',
      { email },
      () => {
        dispatch(setLoaded());
      },
      () => {
        dispatch(setLoaded());
      },
    );
  };
}
// PHONE 驗證
export function verifyPhone({ phone, sms, password, name }) {
  return (dispatch) => {
    dispatch(setLoading());
    fetchXhrPost(
      '/ajax/phone_verify.json',
      { phone, sms, password, name },
      (response) => {
        dispatch(doLogin(response.data.user_profile));
        dispatch(verifyFail(null));
        browserHistory.push('/');
        dispatch(setLoaded());
      },
      (response) => {
        dispatch(verifyFail(response.message));
        dispatch(setLoaded());
      },
    );
  };
}
/* PHONE 重發驗證 */
export function resendPhoneVerification({ phone }) {
  return (dispatch) => {
    dispatch(setLoading());
    fetchXhrPost(
      '/ajax/phone_verify_resend.json',
      { phone },
      () => {
        dispatch(setLoaded());
      },
      () => {
        dispatch(setLoaded());
      },
    );
  };
}
// EMAIL 登入
export function loginEmail({ email, password }) {
  return (dispatch) => {
    dispatch(setLoading());
    fetchXhrPost(
      '/ajax/email_login.json',
      { email, password },
      (response) => {
        dispatch(doLogin(response.data.user_profile));
        // REDIRECT
        browserHistory.push('/');
        dispatch(setLoaded());
      },
      (response) => {
        dispatch(loginFail(response.message));
        dispatch(setLoaded());
      },
    );
  };
}
// PHONE 登入
export function loginPhone({ phone, password }) {
  return (dispatch) => {
    dispatch(setLoading());
    fetchXhrPost(
      '/ajax/phone_login.json',
      { phone, password },
      (response) => {
        dispatch(doLogin(response.data.user_profile));
        browserHistory.push('/');
        dispatch(setLoaded());
      },
      (response) => {
        dispatch(loginFail(response.message));
        dispatch(setLoaded());
      },
    );
  };
}
// FACEBOOK 登入
export function loginFacebook({ userID, accessToken }) {
  return (dispatch) => {
    dispatch(setLoading());
    fetchXhrPost(
      '/ajax/facebook_login_callback.json',
      { fb_id: userID, access_token: accessToken },
      (response) => {
        dispatch(doLogin(response.data.user_profile));
        browserHistory.push('/');
        dispatch(setLoaded());
      },
      (response) => {
        dispatch(loginFail(response.message));
        dispatch(setLoaded());
      },
    );
  };
}
