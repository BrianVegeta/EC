// 變更手機 EMAIL, NO REDUCER
import { asyncXhrAuthedPost } from 'lib/xhr';

export const TO_CREATE = 'TO_CREATE';
export const TO_UPDATE = 'TO_UPDATE';

export const FLOW_INIT = 'FLOW_INIT';
export const FLOW_EDITING = 'FLOW_EDITING';
export const FLOW_VERIFYING = 'FLOW_VERIFYING';


// 變更電話: 發送驗證碼
const isCatch = true;
export const getPhoneVerifyCode = (phone, password) =>
  (dispatch, getState) =>
    new Promise((resolve, reject) => {
      asyncXhrAuthedPost(
        '/ajax/user/update/phone.json',
        { new_mobile: phone, password },
        getState(),
        isCatch,
      ).then((data) => {
        resolve(data);
      }).catch((error) => {
        reject(error);
      });
    });


// 變更電話: 確認驗證碼
export const updatePhone = sms =>
  (dispatch, getState) =>
    new Promise((resolve, reject) => {
      asyncXhrAuthedPost(
        '/ajax/user/update/phone/confirm.json',
        { sms },
        getState(),
        isCatch,
      ).then((data) => {
        resolve(data);
      }).catch((error) => {
        reject(error);
      });
    });

// 變更EMAIL: 取得驗證碼
export const getEmailVerifyCode = (email, password) =>
  (dispatch, getState) =>
    new Promise((resolve, reject) => {
      asyncXhrAuthedPost(
        '/ajax/user/update/email.json',
        { new_email: email, password },
        getState(),
        isCatch,
      ).then((data) => {
        resolve(data);
      }).catch((error) => {
        reject(error);
      });
    });

// 變更EMAIL: 確認驗證碼&變更
export const updateEmail = verifyCode =>
  (dispatch, getState) =>
    new Promise((resolve, reject) => {
      asyncXhrAuthedPost(
        '/ajax/user/update/email/confirm.json',
        { verifycode: verifyCode },
        getState(),
        isCatch,
      ).then((data) => {
        resolve(data);
      }).catch((error) => {
        reject(error);
      });
    });
