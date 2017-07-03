import * as TYPES from '../constants/actionTypes/item';

const initialState = {
  detail: {},
};
export default function item(state = initialState, action) {
  switch (action.type) {
    case TYPES.SET_EDIT:
      return Object.assign({}, state, { detail: action.detail });
    default:
      return state;
  }
}
