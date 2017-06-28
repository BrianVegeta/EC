import * as TYPES from '../constants/actionTypes';
import * as AUTH_BY from '../constants/authBy';
import {
  REGISTER_REGISTERING,
  REGISTER_VERIFING,
} from '../constants/states';

const initialState = {
  isLogin: false,
  currentUser: {},
  registerBy: AUTH_BY.EMAIL,
  registerState: REGISTER_REGISTERING,
  registerFailMessage: null,
  verifyFailMessage: null,
  loginFailMessage: null,
  loginBy: AUTH_BY.EMAIL,
  email: '',
  phone: '',
  password: '',
  passwordConfirmation: '',
  nickname: '',
  verifyCode: '',
};
export default (state = initialState, action) => {
  const updateState = name => Object.assign({}, state, { [name]: action[name] });

  switch (action.type) {
    case TYPES.AUTH_SET_CURRENT_USER: {
      const { currentUser } = action;
      return Object.assign({}, state, { isLogin: true, currentUser });
    }
    case TYPES.AUTH_SET_LOGIN_STATUS:
      return updateState('isLogin');
    case TYPES.AUTH_UPDATE_REGISTER_BY:
      return updateState('registerBy');
    case TYPES.AUTH_REGISTER_TO_VERIFY:
      return Object.assign({}, state, {
        registerState: REGISTER_VERIFING,
      });
    case TYPES.AUTH_FAIL_AFTER_REGISTER:
      return updateState('registerFailMessage');
    case TYPES.AUTH_FAIL_AFTER_VERIFY:
      return updateState('verifyFailMessage');
    case TYPES.AUTH_FAIL_AFTER_LOGIN:
      return updateState('loginFailMessage');
    case TYPES.AUTH_UPDATE_LOGIN_BY:
      return updateState('loginBy');
    case TYPES.AUTH_UPDATE_EMAIL:
      return updateState('email');
    case TYPES.AUTH_UPDATE_PHONE:
      return updateState('phone');
    case TYPES.AUTH_UPDATE_PASSWORD:
      return updateState('password');
    case TYPES.AUTH_UPDATE_PASSWORD_CONFIRMATION:
      return updateState('passwordConfirmation');
    case TYPES.AUTH_UPDATE_NICKNAME:
      return updateState('nickname');
    case TYPES.AUTH_UPDATE_VERIFY_CODE:
      return updateState('verifyCode');
    default:
      return state;
  }
};
