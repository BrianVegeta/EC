/* eslint-disable import/prefer-default-export */
import * as TYPES from '../constants/actionTypes';

export const changeCurrentNav = currentNav => ({
  type: TYPES.ITEM_LAYOUT_CHANGE_CURRENT_NAV,
  currentNav,
});
