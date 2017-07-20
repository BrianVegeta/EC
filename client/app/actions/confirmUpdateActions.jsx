// 變更手機 EMAIL, NO REDUCER
// export func getPhoneVerifyCode(phone, password, { success, error })
// export func getEmailVerifyCode(email, password, { success, error })
// export func updatePhone(verifyCode, { success, error })
// export func updateEmail(verifyCode, { success, error })
import { asyncXhrAuthedPost } from 'lib/xhr';

// 變更電話: 發送驗證碼
export function getPhoneVerifyCode(phone, password, { success, error }) {
  return (dispatch, getState) => {
    asyncXhrAuthedPost(
      '/ajax/user/update/phone.json',
      { new_mobile: phone, password },
      getState(),
    )
    .then(success)
    .catch(error);
  };
}

// 變更電話: 確認驗證碼
export function updatePhone(sms, { success, error }) {
  return (dispatch, getState) => {
    asyncXhrAuthedPost(
      '/ajax/user/update/phone/confirm.json',
      { sms },
      getState(),
    )
    .then(success)
    .catch(error);
  };
}

// 變更EMAIL: 取得驗證碼
export function getEmailVerifyCode(email, password, { success, error }) {
  return (dispatch, getState) => {
    asyncXhrAuthedPost(
      '/ajax/user/update/email.json',
      { new_email: email, password },
      getState(),
    )
    .then(success)
    .catch(error);
  };
}

// 變更EMAIL: 確認驗證碼&變更
export function updateEmail(verifyCode, { success, error }) {
  return (dispatch, getState) => {
    asyncXhrAuthedPost(
      '/ajax/user/update/email/confirm.json',
      { verifycode: verifyCode },
      getState(),
    )
    .then(success)
    .catch(error);
  };
}
