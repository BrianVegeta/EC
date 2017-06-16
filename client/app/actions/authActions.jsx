/* eslint-disable import/prefer-default-export */
import * as TYPES from '../constants/actionTypes';

export const setLoginStatus = isLogin => ({
  type: TYPES.AUTH_SET_LOGIN_STATUS,
  isLogin,
});
export function testRegist() {
  return (dispatch) => {
    fetch('/ajax/email_register.json', {
      credentials: 'same-origin',
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'phyala@gmailc.om',
        password: 'test',
      }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((err) => { throw err; });
  };
}
export function testVerify() {
  return (dispatch) => {
    fetch('/ajax/email_verify.json', {
      credentials: 'same-origin',
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'phyala@gmailc.om',
        verifycode: '1234',
      }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((err) => { throw err; });
  };
}
export function testGet() {
  return (dispatch) => {
    fetch('/ajax/test.json', {
      credentials: 'same-origin',
      method: 'GET',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((err) => { throw err; });
  };
}
