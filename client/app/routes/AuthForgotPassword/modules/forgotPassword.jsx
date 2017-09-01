import { fromJS } from 'immutable';
import { omit } from 'lodash';
import { asyncXhrPost } from 'lib/xhr';
import { redirectAfterLogin } from 'lib/redirect';
import { postLogin, login } from 'modules/auth';

// =============================================
// = settings =
// =============================================
export const REDUCER_KEY = 'forgotPassword';
const prefix = action => (`FORGOT_PASSWORD.${action}`);

export const REQUEST_BY_EMAIL = 'REQUEST_BY_EMAIL';
export const REQUEST_BY_PHONE = 'REQUEST_BY_PHONE';
export const STATE_REQUESTING = 'STATE_REQUESTING';
export const STATE_RESETING = 'STATE_REGISTERING';
export const STATE_VERIFYING = 'STATE_VERIFYING';

// =============================================
// = ACTION TYPE =
// =============================================
const LOADING = prefix('LOADING');
const LOADED = prefix('LOADED');
const SWITCH_VERIFYING = prefix('SWITCH_VERIFYING');
const SWITCH_RESETING = prefix('SWITCH_RESETING');
const SWITCH_EMAIL_REQUEST = prefix('SWITCH_EAMIL_REQUEST');
const SWITCH_PHONE_REQUEST = prefix('SWITCH_PHONE_REQUEST');
const FAILED = prefix('FAILED');
const SET_TOKEN = prefix('SET_TOKEN');
// setup
const CHANGE_FORM = prefix('CHANGE_FORM');
const RESET = prefix('RESET');


// =============================================
// = ACTIONS =
// =============================================
const loading = () => ({
  type: LOADING,
});

const loaded = () => ({
  type: LOADED,
});

const switchVerifying = () => ({
  type: SWITCH_VERIFYING,
});

const switchReseting = () => ({
  type: SWITCH_RESETING,
});

export const switchEmailRequest = () => ({
  type: SWITCH_EMAIL_REQUEST,
});

export const switchPhoneRequest = () => ({
  type: SWITCH_PHONE_REQUEST,
});

const failed = message => ({
  type: FAILED,
  message,
});

export const changeForm = data => ({
  type: CHANGE_FORM,
  data,
});

export const setToken = token => ({
  type: SET_TOKEN,
  token,
});

export const reset = () => ({
  type: RESET,
});

const requestVerifyCode = () =>
  (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const { requestBy, form: { email, phone } } = getState()[REDUCER_KEY];
      const [path, params] = {
        [REQUEST_BY_EMAIL]: ['email_get_verify.json', { email }],
        [REQUEST_BY_PHONE]: ['phone_get_verify.json', { phone }],
      }[requestBy];

      asyncXhrPost(
        `/ajax/forgot_password/${path}`,
        params,
        true,
      ).then(() => {
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });

export const getVerifyCode = () =>
  dispatch =>
    new Promise((resolve, reject) => {
      dispatch(loading());
      dispatch(requestVerifyCode()).then(() => {
        dispatch(loaded());
        dispatch(switchVerifying());
        dispatch(failed(''));

        resolve();
      }).catch(({ message }) => {
        dispatch(loaded());
        dispatch(failed(message));

        reject(message);
      });
    });

export const resendVerifyCode = () =>
  dispatch =>
    new Promise((resolve, reject) => {
      dispatch(loading());
      dispatch(requestVerifyCode()).then(() => {
        dispatch(loaded());
        dispatch(failed(''));

        resolve();
      }).catch(({ message }) => {
        dispatch(loaded());
        dispatch(failed(message));

        reject(message);
      });
    });

export const toggleRequestBy = () =>
  (dispatch, getState) => {
    const { requestBy } = getState()[REDUCER_KEY];
    const switchRequest = {
      [REQUEST_BY_EMAIL]: switchPhoneRequest,
      [REQUEST_BY_PHONE]: switchEmailRequest,
    }[requestBy];
    dispatch(switchRequest());
  };

export const verify = () =>
  (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const {
        requestBy,
        form: { email, phone, verifyCode },
      } = getState()[REDUCER_KEY];
      const [path, params] = {
        [REQUEST_BY_EMAIL]: ['email_get_token.json', { email, verifycode: verifyCode }],
        [REQUEST_BY_PHONE]: ['phone_get_token.json', { phone, sms: verifyCode }],
      }[requestBy];

      dispatch(loading());
      asyncXhrPost(
        `/ajax/forgot_password/${path}`,
        params,
        true,
      ).then(({ token }) => {
        dispatch(loaded());
        dispatch(failed(''));
        dispatch(switchReseting());
        dispatch(setToken(token));

        resolve();
      }).catch(({ message }) => {
        dispatch(loaded());
        dispatch(failed(message));

        reject(message);
      });
    });

export const resetPassword = () =>
  (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const {
        requestBy,
        token,
        form: { email, phone, password },
      } = getState()[REDUCER_KEY];
      const [path, params] = {
        [REQUEST_BY_EMAIL]: ['email_reset_password', { email, password, token }],
        [REQUEST_BY_PHONE]: ['phone_reset_password', { phone, password, token }],
      }[requestBy];

      dispatch(loading());
      asyncXhrPost(
        `/ajax/forgot_password/${path}.json`,
        params,
        true,
      ).then(() => {
        postLogin(omit(params, ['token'])).then((userProfile) => {
          dispatch(login(userProfile));
          resolve();
          dispatch(loaded());
          dispatch(failed(''));
          setTimeout(() => {
            dispatch(redirectAfterLogin('/'));
          }, 1500);
        });
      }).catch(({ message }) => {
        dispatch(loaded());
        dispatch(failed(message));

        reject(message);
      });
    });

// =============================================
// = REDUCER =
// =============================================
const initialState = {
  isLoading: false,
  requestBy: REQUEST_BY_EMAIL,
  state: STATE_REQUESTING,
  errorMessage: '',
  token: '',
  form: {
    email: '',
    phone: '',
    verifyCode: '',
    password: '',
    passwordConfirmation: '',
  },
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

    case SWITCH_VERIFYING:
      return Object.assign({}, state, {
        state: STATE_VERIFYING,
      });

    case SWITCH_RESETING:
      return Object.assign({}, state, {
        state: STATE_RESETING,
      });

    case SWITCH_EMAIL_REQUEST:
      return Object.assign({}, initialState, {
        requestBy: REQUEST_BY_EMAIL,
      });

    case SWITCH_PHONE_REQUEST:
      return Object.assign({}, initialState, {
        requestBy: REQUEST_BY_PHONE,
      });

    case FAILED:
      return Object.assign({}, state, {
        errorMessage: action.message,
      });

    case CHANGE_FORM:
      return fromJS(state).updateIn(
        ['form'],
        form => form.merge(action.data),
      ).toJS();

    case SET_TOKEN:
      return Object.assign({}, state, {
        token: action.token,
      });

    case RESET:
      return initialState;

    default:
      return state;
  }
};
