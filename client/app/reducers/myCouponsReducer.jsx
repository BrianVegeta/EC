import * as types from '../constants/actionTypes/myCoupons';

const initialState = {
  isFetching: false,
  list: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_COUPONS:
      return Object.assign({}, state, {
        isFetching: true,
      });

    case types.RECEIVE_COUPONS:
      return Object.assign({}, state, {
        isFetching: false,
        list: action.coupons,
      });

    default:
      return state;
  }
};
