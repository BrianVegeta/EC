import * as TYPES from '../constants/actionTypes';
import { ITEM_MAIN_INTRODUCTION } from '../constants/htmlIds';

const initialState = {
  currentNav: ITEM_MAIN_INTRODUCTION,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.ITEM_LAYOUT_CHANGE_CURRENT_NAV: {
      const { currentNav } = action;
      return Object.assign({}, state, { currentNav });
    }
    default:
      return state;
  }
};
