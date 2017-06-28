import * as TYPES from '../constants/actionTypes/notification';

const initialState = {
  boxItems: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.SET_NOTIFICATIONS:
      return Object.assign({}, state, { boxItems: action.boxItems });
    default:
      return state;
  }
};
