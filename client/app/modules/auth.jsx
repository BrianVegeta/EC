import { asyncXhrPost } from 'lib/xhr';

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
