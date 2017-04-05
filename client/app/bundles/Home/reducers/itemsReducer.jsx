import * as TYPES from '../constants/actionTypes';

const initialState = [];
export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.ITEMS_FETCHING:
      return [];
    case TYPES.ITEMS_FETCHED:
      return action.items;
    default:
      return state;
  }
};
