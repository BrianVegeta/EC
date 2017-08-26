import { asyncXhrPost } from 'lib/xhr';
import {
  postLogin,
  postLoginFacebook,
} from 'modules/auth';

// =============================================
// = settings =
// =============================================
export const REDUCER_KEY = 'login';
const prefix = action => (`WISH.${action}`);

export const LOGIN_BY_EMAIL = 'LOGIN_BY_EMAIL';
export const LOGIN_BY_PHONE = 'LOGIN_BY_PHONE';

// =============================================
// = ACTION TYPE =
// =============================================
export const LOADING = prefix('LOADING');
export const LOADED = prefix('LOADED');
export const SWITCH_LOGIN_BY_EMAIL = prefix('SWITCH_LOGIN_BY_EMAIL');
export const SWITCH_LOGIN_BY_PHONE = prefix('SWITCH_LOGIN_BY_PHONE');

export const LOGIN_FAILED = prefix('LOGIN_FAILED');
export const CHANGE_FORM = prefix('CHANGE_FORM');
export const RESET = prefix('RESET');
// export const CHANGE_CURRENT_USER = prefix('CHANGE_CURRENT_USER');


// =============================================
// = ACTIONS =
// =============================================
const loading = () => ({
  type: LOADING,
});

const loaded = () => ({
  type: LOADED,
});

export const switchLoginByEmail = () => ({
  type: SWITCH_LOGIN_BY_EMAIL,
});

export const switchLoginByPhone = () => ({
  type: SWITCH_LOGIN_BY_PHONE,
});

const loginFail = message => ({
  type: LOGIN_FAILED,
  message,
});

export const changeForm = data => ({
  type: CHANGE_FORM,
  data,
});

export const reset = () => ({
  type: RESET,
});

export const loginEmail = ({ email, password }) =>
  dispatch =>
    new Promise((resolve, reject) => {
      dispatch(loading());
      postLogin({ email, password }).then((userProfile) => {
        // dologin
        console.log(userProfile);
        resolve();
        // browserHistory.push('/');
      }).catch((message) => {
        dispatch(loginFail(message));
        dispatch(loaded());
        reject();
      });
    });

export const loginPhone = ({ phone, password }) =>
  dispatch =>
    new Promise((resolve, reject) => {
      dispatch(loading());
      postLogin({ phone, password }).then((userProfile) => {
        // dologin
        console.log(userProfile);
        resolve();
        // browserHistory.push('/');
      }).catch((message) => {
        dispatch(loginFail(message));
        dispatch(loaded());
        reject();
      });
    });

export const loginFacebook = ({ userID, accessToken }) =>
  dispatch =>
    new Promise((resolve, reject) => {
      postLoginFacebook({ userID, accessToken }).then((userProfile) => {
        // dologin
        console.log(userProfile);
        resolve();
        // browserHistory.push('/');
      }).catch((message) => {
        dispatch(loginFail(message));
        dispatch(loaded());
        reject();
      });
    });

// =============================================
// = REDUCER =
// =============================================
const initialState = {
  isLoading: false,
  loginBy: LOGIN_BY_EMAIL,
  loginError: null,
  email: '',
  phone: '',
  password: '',
  passwordConfirmation: '',
};

export default (state = initialState, action) => {
  switch (action.type) {

    case LOADING:
      return Object.assign({}, state, {
        isLoading: true,
      });

    case LOADED:
      return Object.assign({}, state, {
        isLoading: false,
      });

    case SWITCH_LOGIN_BY_EMAIL:
      return Object.assign({}, state, {
        loginBy: LOGIN_BY_EMAIL,
      });

    case SWITCH_LOGIN_BY_PHONE:
      return Object.assign({}, state, {
        loginBy: LOGIN_BY_PHONE,
      });

    case LOGIN_FAILED:
      return Object.assign({}, state, {
        loginError: action.message,
      });

    case CHANGE_FORM:
      return Object.assign({}, state, action.data);

    default:
      return state;
  }
};
