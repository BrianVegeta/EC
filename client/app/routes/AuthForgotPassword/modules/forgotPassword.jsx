import { fromJS } from 'immutable';
import {
  postRegister,
  postVerify,
  postResendVerify,
} from 'modules/auth';

// =============================================
// = settings =
// =============================================
export const REDUCER_KEY = 'registration';
const prefix = action => (`REGISTRATION.${action}`);

export const REQUEST_BY_EMAIL = 'REQUEST_BY_EMAIL';
export const REQUEST_BY_PHONE = 'REQUEST_BY_PHONE';
export const STATE_REQUESTING = 'STATE_REQUESTING';
export const STATE_RESETING = 'STATE_REGISTERING';
export const STATE_VERIFYING = 'STATE_VERIFYING';

// =============================================
// = ACTION TYPE =
// =============================================
export const LOADING = prefix('LOADING');
export const LOADED = prefix('LOADED');
export const SWITCH_VERIFYING = prefix('SWITCH_VERIFYING');
export const SWITCH_RESETING = prefix('SWITCH_RESETING');
export const SWITCH_EAMIL_REQUEST = prefix('SWITCH_EAMIL_REQUEST');
export const SWITCH_PHONE_REQUEST = prefix('SWITCH_PHONE_REQUEST');
export const FAILED_REQUEST = prefix('FAILED_REQUEST');
export const FAILED_VERIFY = prefix('FAILED_RESET');
export const FAILED_RESET = prefix('FAILED_RESET');
export const FAILED = prefix('FAILED');
// setup
export const CHANGE_FORM = prefix('CHANGE_FORM');
export const RESET = prefix('RESET');


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

export const switchEmailRequest = () => ({
  type: SWITCH_EAMIL_REQUEST,
});

export const switchPhoneRequest = () => ({
  type: SWITCH_PHONE_REQUEST,
});

const registerFailed = message => ({
  type: REGISTER_FAILED,
  message,
});

const verifyFailed = message => ({
  type: VERIFY_FAILED,
  message,
});

export const changeForm = data => ({
  type: CHANGE_FORM,
  data,
});

export const reset = () => ({
  type: RESET,
});


// =============================================
// = REDUCER =
// =============================================
const initialState = {
  isLoading: false,
  requestBy: REQUEST_BY_EMAIL,
  state: STATE_REQUESTING,

  email: '',
  phone: '',
  verifyCode: '',

  password: '',
  passwordConfirmation: '',
};

export default (state = initialState, action) => {
  switch (action.type) {

    case LOADING:
      return Object.assign({}, state, { isLoading: true });

    case LOADED:
      return Object.assign({}, state, { isLoading: false });

    case SWITCH_VERIFYING:
      return Object.assign({}, state, {
        state: STATE_VERIFYING,
      });

    case CHANGE_FORM:
      return Object.assign({}, state, action.data);

    case RESET:
      return initialState;

    default:
      return state;
  }
};
