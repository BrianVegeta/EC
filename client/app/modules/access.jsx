/* eslint-disable import/prefer-default-export */
import {
  asyncXhrAuthedGet,
  asyncXhrAuthedPost,
} from 'lib/xhr';

/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'ACCESS';

export const NEW = 'NEW';
export const CHECK = 'CHECK';


// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);
export const EXIST_CHECKING = prefix('EXIST_CHECKING');
export const EXIST_CHECKED = prefix('EXIST_CHECKED');
export const CHANGE_STATE = prefix('CHANGE_STATE');
export const CHECKING = prefix('CHECKING');
export const CHECKED = prefix('CHECKED');
export const SET_ERROR = prefix('SET_ERROR');
export const RESET = prefix('RESET');

// =============================================
// = actions =
// =============================================

const existChecking = () => ({
  type: EXIST_CHECKING,
});

const existChecked = exist => ({
  type: EXIST_CHECKED,
  exist,
});

const changeChecking = () => ({
  type: CHECKING,
});

const changeChecked = () => ({
  type: CHECKED,
});

const setError = hasError => ({
  type: SET_ERROR,
  hasError,
});

export const changeState = state => ({
  type: CHANGE_STATE,
  state,
});

export const reset = () => ({
  type: RESET,
});

// CHECK PASSWORD EXIST
export const checkPasswordExist = () =>
  (dispatch, getState) => {
    dispatch(existChecking());

    asyncXhrAuthedGet(
      '/ajax/password/exist.json',
      getState(),
    ).then(data => dispatch(existChecked(data)));
  };

// CREATE PASSWORD
export const createPassword = (password, onChecked) =>
  (dispatch, getState) => {
    dispatch(changeChecking());
    setError(null);

    asyncXhrAuthedPost(
      '/ajax/password/create.json',
      { password },
      getState(),
    ).then((isChecked) => {
      dispatch(changeChecked());
      dispatch(setError(!isChecked));
      if (isChecked) {
        onChecked(password);
      }
    });
  };

// CHECK PASSWORD
export const checkPassword = (password, onChecked) =>
  (dispatch, getState) => {
    dispatch(changeChecking());
    setError(null);

    asyncXhrAuthedPost(
      '/ajax/password/check.json',
      { password },
      getState(),
    ).then((isChecked) => {
      dispatch(changeChecked());
      dispatch(setError(!isChecked));
      if (isChecked) {
        onChecked(password);
      }
    });
  };

// =============================================
// = reducer =
// =============================================
const initialState = {
  isChecking: false,
  renderType: CHECK,
  password: '',
  hasError: null,
};

const home = (state = initialState, action) => {
  switch (action.type) {
    case EXIST_CHECKING:
      return Object.assign({}, state, {
        isChecking: true,
      });

    case EXIST_CHECKED:
      return Object.assign({}, state, {
        isChecking: false,
        renderType: action.exist ? CHECK : NEW,
      });

    case CHANGE_STATE:
      return Object.assign({}, state, action.state);

    case CHECKING:
      return Object.assign({}, state, {
        isChecking: true,
      });

    case CHECKED:
      return Object.assign({}, state, {
        isChecking: false,
      });

    case SET_ERROR:
      return Object.assign({}, state, {
        hasError: action.hasError,
      });

    case RESET:
      return initialState;

    default:
      return state;
  }
};
export default home;
