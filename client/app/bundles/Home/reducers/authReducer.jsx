import * as TYPES from '../constants/actionTypes';

const initialState = {
  isLogin: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.AUTH_SET_LOGIN_STATUS: {
      const { isLogin } = action;
      return Object.assign({}, state, { isLogin });
    }
    default:
      return state;
  }
};
