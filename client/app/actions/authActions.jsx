/* eslint-disable import/prefer-default-export */
import { browserHistory } from 'react-router';
import * as TYPES from '../constants/actionTypes';
import * as AUTH_BY from '../constants/authBy';
import { fetchRequest, fetchGetRequest, fetchPostRequest } from '../lib/xhr';
import { POST } from './methods';

export function logout() {
  return (dispatch) => {
    fetchPostRequest('/ajax/logout.json', {}, (response) => {
      console.log(response);
      // TODO: logut
    });
  };
}
const setCurrentUser = currentUser => ({
  type: TYPES.AUTH_SET_CURRENT_USER,
  currentUser,
});
function fetchCurrentUser(afterSuccess, afterFail) {
  fetchGetRequest('/ajax/auth/get_current_user.json', (response) => {
    const { success } = response;
    if (success) {
      afterSuccess(response);
    } else {
      afterFail(response);
    }
  });
}
export function checkCurrentUser(redirectToLogin = null) {
  return (dispatch) => {
    const afterSuccess = (response) => { dispatch(setCurrentUser(response.data)); };
    const afterFail = () => {
      if (redirectToLogin) redirectToLogin();
    };
    fetchCurrentUser(afterSuccess, afterFail);
  };
}
export function requireLoginAndGetUser() {
  return (dispatch) => {
    const afterSuccess = (response) => { dispatch(setCurrentUser(response.data)); };
    const afterFail = () => { browserHistory.push('/p/login'); };
    fetchCurrentUser(afterSuccess, afterFail);
  };
}

export const setLoginStatus = isLogin => ({
  type: TYPES.AUTH_SET_LOGIN_STATUS,
  isLogin,
});

const registerFail = registerFailMessage => ({
  type: TYPES.AUTH_FAIL_AFTER_REGISTER,
  registerFailMessage,
});

const verifyFail = verifyFailMessage => ({
  type: TYPES.AUTH_FAIL_AFTER_VERIFY,
  verifyFailMessage,
});

const loginFail = loginFailMessage => ({
  type: TYPES.AUTH_FAIL_AFTER_LOGIN,
  loginFailMessage,
});

const registerToVerify = () => ({
  type: TYPES.AUTH_REGISTER_TO_VERIFY,
});

const REGISTRATION_EMAIL_PATH = '/ajax/email_register.json';
const REGISTRATION_MOBILE_PATH = '/ajax/phone_register.json';
export function registerByEmail({ email, password }) {
  return (dispatch) => {
    dispatch(registerFail(null));
    const settings = POST;
    const bodyJSON = JSON.stringify({ email, password });
    fetchRequest(
      REGISTRATION_EMAIL_PATH,
      settings,
      bodyJSON,
      (data) => {
        const { success, message } = data;
        if (success) {
          dispatch(registerToVerify());
        } else {
          dispatch(registerFail(message));
        }
      },
    );
  };
}

export function registerByPhone({ phone, password }) {
  return (dispatch) => {
    dispatch(registerFail(null));
    const settings = POST;
    const bodyJSON = JSON.stringify({ phone, password });
    fetchRequest(
      REGISTRATION_MOBILE_PATH,
      settings,
      bodyJSON,
      (data) => {
        const { success, message } = data;
        if (success) {
          dispatch(registerToVerify());
        } else {
          dispatch(registerFail(message));
        }
      },
    );
  };
}

const VERIFICATION_EMAIL_PATH = '/ajax/email_verify.json';
const VERIFICATION_MOBILE_PATH = '/ajax/phone_verify.json';
export function verifyByEmail({ email, verifycode }) {
  return (dispatch) => {
    dispatch(verifyFail(null));
    const bodyJSON = JSON.stringify({ email, verifycode });
    fetchRequest(
      VERIFICATION_EMAIL_PATH,
      POST,
      bodyJSON,
      (data) => {
        const { success, message } = data;
        if (success) {
          dispatch(setLoginStatus(true));
          // TODO: change user profile after regisration
        } else {
          dispatch(verifyFail(message));
        }
      },
    );
  };
}

export function verifyByPhone({ phone, sms }) {
  return (dispatch) => {
    dispatch(verifyFail(null));
    const bodyJSON = JSON.stringify({ phone, sms });
    fetchRequest(
      VERIFICATION_MOBILE_PATH,
      POST,
      bodyJSON,
      (data) => {
        const { success, message } = data;
        if (success) {
          dispatch(setLoginStatus(true));
          // TODO: change user profile after regisration
        } else {
          dispatch(verifyFail(message));
        }
      },
    );
  };
}
const EMAIL_LOGIN_PATH = '/ajax/email_login.json';
const PHONE_LOGIN_PATH = '/ajax/phone_login.json';
export function loginByEmail({ email, password }) {
  return (dispatch) => {
    fetchRequest(
      EMAIL_LOGIN_PATH, POST, JSON.stringify({ email, password }),
      (data) => {
        const { success, message } = data;
        if (success) {
          dispatch(setLoginStatus(true));
          // TODO: change user profile after regisration
        } else {
          dispatch(loginFail(message));
        }
      },
    );
  };
}
export function loginByPhone({ phone, password }) {
  return (dispatch) => {
    fetchRequest(
      PHONE_LOGIN_PATH,
      POST,
      JSON.stringify({ phone, password }),
      (data) => {
        const { success, message } = data;
        if (success) {
          dispatch(setLoginStatus(true));
          // TODO: change user profile after regisration
        } else {
          dispatch(loginFail(message));
        }
      },
    );
  };
}

const FACEBOOK_PATH = '/ajax/facebook_login_callback.json';
export function loginFacebook(callbackData) {
  return (dispatch) => {
    fetchRequest(
      FACEBOOK_PATH,
      POST,
      JSON.stringify({
        fb_id: callbackData.id,
        access_token: callbackData.accessToken,
      }),
      (data) => {
        const { success, message } = data;
        if (success) {
          dispatch(setLoginStatus(true));
        } else {
          dispatch(loginFail(message));
        }
      },
    );
  };
}


export const updateEmail = email => ({
  type: TYPES.AUTH_UPDATE_EMAIL,
  email,
});
export const updatePhone = phone => ({
  type: TYPES.AUTH_UPDATE_PHONE,
  phone,
});
export const updatePassword = password => ({
  type: TYPES.AUTH_UPDATE_PASSWORD,
  password,
});
export const updatePasswordConfirmation = passwordConfirmation => ({
  type: TYPES.AUTH_UPDATE_PASSWORD_CONFIRMATION,
  passwordConfirmation,
});
export const updateNickname = nickname => ({
  type: TYPES.AUTH_UPDATE_NICKNAME,
  nickname,
});
export const updateRegisterBy = registerBy => ({
  type: TYPES.AUTH_UPDATE_REGISTER_BY,
  registerBy,
});
export const switchEmailRegistration = () => (
  updateRegisterBy(AUTH_BY.EMAIL)
);
export const switchPhoneRegistration = () => (
  updateRegisterBy(AUTH_BY.PHONE)
);
export const updateLoginBy = loginBy => ({
  type: TYPES.AUTH_UPDATE_LOGIN_BY,
  loginBy,
});
export const switchEmailLogin = () => (
  updateLoginBy(AUTH_BY.EMAIL)
);
export const switchPhoneLogin = () => (
  updateLoginBy(AUTH_BY.PHONE)
);
export const updateVerifyCode = verifyCode => ({
  type: TYPES.AUTH_UPDATE_VERIFY_CODE,
  verifyCode,
});
