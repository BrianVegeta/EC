import { fromJS } from 'immutable';
import { asyncXhrPost, asyncXhrGet, fetchXhrDelete } from 'lib/xhr';
import { refreshRoute } from 'lib/redirect';

// =============================================
// = settings =
// =============================================
export const REDUCER_KEY = 'auth';
const prefix = action => (`AUTH.${action}`);


// =============================================
// = ACTION TYPE =
// =============================================
const LOGIN = prefix('LOGIN');
const LOGOUT = prefix('LOGOUT');
const CHANGE_CURRENT_USER = prefix('CHANGE_CURRENT_USER');


// =============================================
// = ACTIONS =
// =============================================
export const login = currentUser => ({
  type: LOGIN,
  currentUser,
});

const doLogout = () => ({
  type: LOGOUT,
});

export const logout = () =>
  dispatch =>
    fetchXhrDelete('/ajax/logout.json', () => {
      dispatch(doLogout());
      dispatch(refreshRoute());
    });

export const changeCurrentUser = data => ({
  type: CHANGE_CURRENT_USER,
  data,
});

// login email async(none dispatch)
// 登入
export const postLogin = ({ email, phone, password }) =>
  new Promise((resolve, reject) => {
    const path = email ? '/ajax/email_login.json' : '/ajax/phone_login.json';
    const params = email ? { email, password } : { phone, password };

    asyncXhrPost(path, params, true).then(({ user_profile }) => {
      resolve(user_profile);
    }).catch(({ message }) => {
      reject(message);
    });
  });

// 登入 Facebook
export const postLoginFacebook = ({ userID, accessToken, name }) =>
  new Promise((resolve, reject) => {
    const path = '/ajax/facebook_login_callback.json';
    const params = { fb_id: userID, access_token: accessToken, name };
    asyncXhrPost(path, params, true).then(({ user_profile }) => {
      resolve(user_profile);
    }).catch(({ message }) => {
      reject(message);
    });
  });

// 註冊
export const postRegister = ({ email, phone, password }) =>
  new Promise((resolve, reject) => {
    const path = `/ajax/${email ? 'email' : 'phone'}_register.json`;
    const params = email ? { email, password } : { phone, password };

    asyncXhrPost(path, params, true).then(() => {
      resolve();
    }).catch(({ message }) => {
      reject(message);
    });
  });

// 驗證
export const postVerify = ({
  email, verifycode,
  phone, sms,
  password, name,
}) =>
  new Promise((resolve, reject) => {
    const path = `/ajax/${email ? 'email' : 'phone'}_verify.json`;
    const params = Object.assign(
      {},
      (email ? { email, verifycode } : { phone, sms }),
      { password, name },
    );

    asyncXhrPost(path, params, true).then(({ user_profile }) => {
      resolve(user_profile);
    }).catch(({ message }) => {
      reject(message);
    });
  });

export const postResendVerify = ({ email, phone }) =>
  new Promise((resolve, reject) => {
    const path = `/ajax/${email ? 'email' : 'phone'}_verify_resend.json`;
    const params = email ? { email } : { phone };
    asyncXhrPost(path, params, true).then(() => {
      resolve();
    }).catch((message) => {
      reject(message);
    });
  });

export const syncCurrentUser = () =>
  dispatch =>
    asyncXhrGet(
      '/ajax/auth/sync.json',
    ).then((userProfile) => {
      dispatch(login(userProfile));
    }).catch(() => {
      dispatch(doLogout());
    });

// =============================================
// = REDUCER =
// =============================================
const initialState = {
  isLogin: false,
  currentUser: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return Object.assign({}, state, {
        isLogin: false,
        currentUser: {},
      });

    case LOGIN:
      return Object.assign({}, state, {
        isLogin: true,
        currentUser: action.currentUser,
      });

    case CHANGE_CURRENT_USER:
      return fromJS(state).updateIn(
        ['currentUser'],
        currentUser => currentUser.merge(action.data),
      ).toJS();

    default:
      return Object.assign({}, initialState, state);
  }
};
