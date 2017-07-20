/* eslint-disable import/prefer-default-export */
import * as types from 'constants/actionTypes/accessCheck';
// import { popupAccessCheck } from 'actions/popupActions';
import {
  fetchXhrAuthedGet,
  fetchXhrAuthedPost,
} from 'lib/xhr';
import { popupAccessCheck } from 'actions/popupActions';

const existChecking = () => ({
  type: types.EXIST_CHECKING,
});

const existChecked = exist => ({
  type: types.EXIST_CHECKED,
  exist,
});

const changeChecking = () => ({
  type: types.CHECKING,
});

const changeChecked = () => ({
  type: types.CHECKED,
});

// CHECK PASSWORD EXIST
export function checkPasswordExist() {
  return (dispatch, getState) => {
    dispatch(existChecking());

    fetchXhrAuthedGet(
      '/ajax/password/exist.json', getState(),
      response => dispatch(existChecked(response.data)),
    );
  };
}

// CREATE PASSWORD
export function createPassword(password, onChecked) {
  return (dispatch, getState) => {
    dispatch(changeChecking());

    fetchXhrAuthedPost(
      '/ajax/password/create.json', { password }, getState(),
      () => {
        dispatch(changeChecked());
        onChecked(password);
      },
    );
  };
}

// CHECK PASSWORD
export function checkPassword(password, onChecked) {
  return (dispatch, getState) => {
    dispatch(changeChecking());

    fetchXhrAuthedPost(
      '/ajax/password/check.json', { password }, getState(),
      () => {
        dispatch(changeChecked());
        onChecked(password);
      },
    );
  };
}

export function requestAccessCheck(onChecked) {
  return (dispatch) => {
    dispatch(
      popupAccessCheck({ onChecked }, 500),
    );
  };
}

export const changeState = state => ({
  type: types.CHANGE_STATE,
  state,
});

export const resetState = () => ({
  type: types.RESET,
});
