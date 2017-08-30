import { fromJS } from 'immutable';
import { asyncXhrAuthedPost } from 'lib/xhr';


// =============================================
// = settings =
// =============================================
export const REDUCER_KEY = 'myManagePasswordChange';
const prefix = action => (`MY.MANAGE.PASSWORD_CHANGE.${action}`);

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

export const updatePassword = () =>
  (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const {
        data: {
          password,
          newPassword,
        },
      } = getState()[REDUCER_KEY];

      asyncXhrAuthedPost(
        '/ajax/password/update.json',
        { old_password: password, new_password: newPassword },
        getState,
        true,
      ).then(() => {
        resolve();
        dispatch(reset());
      }).catch(({ message }) => reject(message));
    });

// =============================================
// = REDUCER =
// =============================================
const initialState = {
  data: {
    password: '',
    newPassword: '',
    newPasswordConfirmation: '',
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
