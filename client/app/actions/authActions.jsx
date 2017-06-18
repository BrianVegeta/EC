/* eslint-disable import/prefer-default-export */
import * as TYPES from '../constants/actionTypes';
import * as AUTH_BY from '../constants/authBy';
import { fetchRequest } from '../lib/xhr';
import { POST } from './methods';


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
