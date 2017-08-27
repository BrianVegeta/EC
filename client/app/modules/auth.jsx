import { asyncXhrPost } from 'lib/xhr';

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

export const logout = () => ({
  type: LOGOUT,
});

export const changeCurrentUser = () => ({
  type: CHANGE_CURRENT_USER,
});

// login email async(none dispatch)
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

export const postLoginFacebook = ({ userID, accessToken }) =>
  new Promise((resolve, reject) => {
    asyncXhrPost(
      '/ajax/facebook_login_callback.json',
      { fb_id: userID, access_token: accessToken },
      true,
    ).then(({ user_profile }) => {
      resolve(user_profile);
    }).catch(({ message }) => {
      reject(message);
    });
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
      return Object.assign({}, state, {
        currentUser: action.currentUser,
      });

    default:
      return Object.assign({}, initialState, state);
  }
};
