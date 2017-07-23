import * as types from 'constants/actionTypes/auth';
import {
  REGISTER_REGISTERING,
  REGISTER_VERIFING,
} from 'constants/states';
import {
  EMAIL_AUTH,
  PHONE_AUTH,
} from 'constants/authBy';

const initialState = {
  isLogin: false,
  currentUser: {},

  registerBy: EMAIL_AUTH,
  loginBy: EMAIL_AUTH,

  registerState: REGISTER_REGISTERING,
  registerFailMessage: null,
  verifyFailMessage: null,
  loginFailMessage: null,

  email: '',
  phone: '',
  password: '',
  passwordConfirmation: '',
  nickname: '',
  verifyCode: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGOUT:
      return Object.assign({}, state, {
        isLogin: false,
        currentUser: {},
      });

    case types.LOGIN:
      return Object.assign({}, state, {
        isLogin: true,
        currentUser: action.currentUser,
      });

    case types.CHANGE_CURRENT_USER:
      return Object.assign({}, state, {
        currentUser: action.currentUser,
      });

    case types.CHANGE_REGISTER_BY:
      return Object.assign({}, state, {
        registerBy: action.registerBy,
      });

    case types.CHANGE_LOGIN_BY:
      return Object.assign({}, state, {
        loginBy: action.loginBy,
      });

    case types.CHANGE_REGISTER_STATE_VERIFING:
      return Object.assign({}, state, {
        registerState: REGISTER_VERIFING,
      });

    case types.REGISTER_FAILED:
      return Object.assign({}, state, {
        registerFailMessage: action.message,
      });

    case types.VERIFY_FAILED:
      return Object.assign({}, state, {
        verifyFailMessage: action.message,
      });

    case types.LOGIN_FAILED:
      return Object.assign({}, state, {
        loginFailMessage: action.message,
      });

    case types.CHANGE_FORM:
      return Object.assign({}, state, action.dataChange);

    default:
      return Object.assign({}, initialState, state);
  }
};
