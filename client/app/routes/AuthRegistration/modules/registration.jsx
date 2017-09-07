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

export const REGISTER_BY_EMAIL = 'REGISTER_BY_EMAIL';
export const REGISTER_BY_PHONE = 'REGISTER_BY_PHONE';
export const STATE_REGISTERING = 'STATE_REGISTERING';
export const STATE_VERIFYING = 'STATE_VERIFYING';

// =============================================
// = ACTION TYPE =
// =============================================
export const LOADING = prefix('LOADING');
export const LOADED = prefix('LOADED');
export const SWITCH_VERIFYING = prefix('SWITCH_VERIFYING');
export const SWITCH_REGISTER_BY_EMAIL = prefix('SWITCH_REGISTER_BY_EMAIL');
export const SWITCH_REGISTER_BY_PHONE = prefix('SWITCH_REGISTER_BY_PHONE');
// failure
export const REGISTER_FAILED = prefix('REGISTER_FAILED');
export const VERIFY_FAILED = prefix('VERIFY_FAILED');
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

export const switchRegisterByEmail = () => ({
  type: SWITCH_REGISTER_BY_EMAIL,
});

export const switchRegisterByPhone = () => ({
  type: SWITCH_REGISTER_BY_PHONE,
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

// 註冊 email
export const registerEmail = () =>
  (dispatch, getState) => {
    const { email, password } = getState()[REDUCER_KEY];
    dispatch(loading());
    postRegister({ email, password }).then(() => {
      dispatch(switchVerifying());
      dispatch(registerFailed(null));
      dispatch(loaded());
    }).catch((message) => {
      dispatch(registerFailed(message));
      dispatch(loaded());
    });
  };

// 驗證 email
export const verifyEmail = () =>
  (dispatch, getState) =>
    new Promise((resolve) => {
      const { email, verifyCode, password, nickname } = getState()[REDUCER_KEY];
      dispatch(loading());
      postVerify({
        email,
        verifycode: verifyCode,
        password,
        name: nickname,
      }).then((userProfile) => {
        resolve(userProfile);
      }).catch((message) => {
        dispatch(verifyFailed(message));
        dispatch(loaded());
      });
    });

// 註冊 phone
export const registerPhone = () =>
  (dispatch, getState) => {
    const { phone, password } = getState()[REDUCER_KEY];
    dispatch(loading());
    postRegister({ phone, password }).then(() => {
      dispatch(switchVerifying());
      dispatch(registerFailed(null));
      dispatch(loaded());
    }).catch((message) => {
      dispatch(registerFailed(message));
      dispatch(loaded());
    });
  };

// 驗證 phone
export const verifyPhone = () =>
  (dispatch, getState) =>
    new Promise((resolve) => {
      const { phone, verifyCode, password, nickname } = getState()[REDUCER_KEY];
      dispatch(loading());
      postVerify({
        phone,
        sms: verifyCode,
        password,
        name: nickname,
      }).then((userProfile) => {
        resolve(userProfile);
      }).catch((message) => {
        dispatch(verifyFailed(message));
        dispatch(loaded());
      });
    });

// 重發 email 驗證
export const resendEmail = () =>
  (dispatch, getState) =>
    new Promise((resolve) => {
      const { email } = getState()[REDUCER_KEY];
      dispatch(loading());
      postResendVerify({ email }).then(() => {
        resolve();
        dispatch(loaded());
      }).catch(() => {
        dispatch(loaded());
      });
    });

// 重發 phone 驗證
export const resendPhone = () =>
  (dispatch, getState) =>
    new Promise((resolve) => {
      const { phone } = getState()[REDUCER_KEY];
      dispatch(loading());
      postResendVerify({ phone }).then(() => {
        resolve();
        dispatch(loaded());
      }).catch(() => {
        dispatch(loaded());
      });
    });


// =============================================
// = REDUCER =
// =============================================
const initialState = {
  isLoading: false,
  registerBy: REGISTER_BY_EMAIL,
  state: STATE_REGISTERING,
  registerError: null,
  verifyError: null,
  email: '',
  phone: '',
  password: '',
  passwordConfirmation: '',
  nickname: '',
  verifyCode: '',
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

    case SWITCH_REGISTER_BY_EMAIL:
      return Object.assign({}, state, {
        registerBy: REGISTER_BY_EMAIL,
      });

    case SWITCH_REGISTER_BY_PHONE:
      return Object.assign({}, state, {
        registerBy: REGISTER_BY_PHONE,
      });

    case REGISTER_FAILED:
      return Object.assign({}, state, {
        registerError: action.message,
      });

    case VERIFY_FAILED:
      return Object.assign({}, state, {
        verifyError: action.message,
      });

    case CHANGE_FORM:
      return Object.assign({}, state, action.data);

    case RESET:
      return initialState;

    default:
      return state;
  }
};
