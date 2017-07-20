/* eslint-disable import/prefer-default-export */

import * as types from 'constants/actionTypes/secrecyVerification';
import { nextProcess } from 'actions/scheduleActions';

import {
  fetchXhrAuthedGet,
  fetchXhrAuthedPost,
} from 'lib/xhr';


export const changePassword = password => ({
  type: types.CHANGE_PASSWORD,
  password,
});

function checkHasPassword({ noPasswordCb, hasPasswordCb }) {
  return (dispatch, getState) => {
    fetchXhrAuthedGet(
      '/ajax/my_pwd_exist.json',
      getState(),
      response => (
        response.data ? hasPasswordCb() : noPasswordCb()
      ),
    );
  };
}

export function createPassword(password, success, fail) {
  return (dispatch, getState) => {
    fetchXhrAuthedPost(
      '/ajax/my_password_create.json',
      { password },
      getState(),
      () => success(),
      () => fail(),
    );
  };
}

export function asyncCheckPasswordExist(state) {
  return new Promise((resolve) => {
    fetchXhrAuthedGet(
      '/ajax/my_pwd_exist.json',
      state,
      response => resolve(response.data),
    );
  });
}

// ASYNC CREATE PASSWORD
function asyncCreatePassword(password, state) {
  return new Promise((resolve) => {
    fetchXhrAuthedPost(
      '/ajax/my_password_create.json',
      { password },
      state,
      response => resolve(response.data),
    );
  });
}

// ASYNC GET BANK INFO
function asyncGetBankInfo(state) {
  return new Promise((resolve) => {
    fetchXhrAuthedPost(
      '/ajax/my_bankacc.json',
      {},
      state,
      response => resolve(response.data),
    );
  });
}

export function createPasswordAndNextBank(password) {
  return (dispatch, getState) => {
    asyncCreatePassword(password, getState())
      .then((success) => {
        if (success) dispatch(nextProcess());
      });
  };
}

// ASYNC CHECK PASSWORD
function asyncCheckPassword(password, state) {
  return new Promise((resolve) => {
    fetchXhrAuthedPost(
      '/ajax/secrecy_verify_password.json',
      { password },
      state,
      response => resolve(response.data),
    );
  });
}

const changeBankInfo = info => ({
  type: types.CHANGE_BANK_INFO,
  info,
});

// CHECK PASSWORD -> NEXT -> GET BANK ->
export function checkPasswordAndNextBank(password) {
  return (dispatch, getState) => {
    asyncCheckPassword(password, getState())
      .then((success) => {
        if (success) dispatch(nextProcess());
        return success;
      })
      .then((success) => {
        if (success) {
          return asyncGetBankInfo(getState());
        }
        return success;
      })
      .then((bankInfo) => {
        if (bankInfo) {
          dispatch(
            changeBankInfo(bankInfo),
          );
        }
      });
  };
}

// 直接拉銀行資料
export function getAndChangeBankInfo() {
  return (dispatch, getState) => {
    asyncGetBankInfo(getState())
      .then(bankInfo =>
        dispatch(
          changeBankInfo(bankInfo),
        ),
      );
  };
}
