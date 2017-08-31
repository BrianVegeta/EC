import { fromJS } from 'immutable';
import { asyncXhrAuthedPost } from 'lib/xhr';


// =============================================
// = settings =
// =============================================
export const REDUCER_KEY = 'myManageVerify';
const prefix = action => (`MY.MANAGE.VERIFY.${action}`);

// =============================================
// = ACTION TYPE =
// =============================================
const CHANGE_DATA = prefix('CHANGE_DATA');
const RESET = prefix('RESET');


// =============================================
// = ACTIONS =
// =============================================
export const changeData = data => ({
  type: CHANGE_DATA,
  data,
});

export const reset = () => ({
  type: RESET,
});

export const transformData = ({
  fb_id, email, phone,
}) => ({
  fb_id,
  email,
  phone,
});
export const fetchUserData = () =>
  (dispatch, getState) => {
    asyncXhrAuthedPost(
      '/ajax/get_userprofile.json',
      getState(),
    ).then((data) => {
      dispatch(changeData(transformData(data)));
    }).catch();
  };

export const connectFacebook = ({ userID, accessToken }) =>
  (dispatch, getState) =>
    new Promise((resolve, reject) => {
      asyncXhrAuthedPost(
        '/ajax/user_bind_facebook.json',
        { fb_id: userID, access_token: accessToken },
        getState(),
        true,
      ).then(() => {
        dispatch(changeData({ fb_id: userID }));
        resolve();
      }).catch(({ message }) => {
        reject(message);
      });
    });

export const disconnectFacebook = ({ userID, accessToken }) =>
  (dispatch, getState) =>
    new Promise((resolve, reject) => {
      asyncXhrAuthedPost(
        '/ajax/user_unbind_facebook.json',
        { fb_id: userID, access_token: accessToken },
        getState(),
        true,
      ).then(() => {
        dispatch(changeData({ fb_id: null }));
        resolve();
      }).catch(({ message }) => {
        reject(message);
      });
    });


// =============================================
// = REDUCER =
// =============================================
const initialState = {
  data: {
    fb_id: null,
    phone: '',
    email: '',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {

    case CHANGE_DATA:
      return fromJS(state).updateIn(
        ['data'],
        data => data.merge(action.data),
      ).toJS();

    case RESET:
      return initialState;

    default:
      return state;
  }
};
