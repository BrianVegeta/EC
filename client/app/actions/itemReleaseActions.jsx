/* eslint-disable import/prefer-default-export */
import * as TYPES from '../constants/actionTypes';

export const setTitle = title => ({
  type: TYPES.ITEM_RELEASE_SET_TITLE,
  title,
});

export const setDescript = descript => ({
  type: TYPES.ITEM_RELEASE_SET_DESCRIPTION,
  descript,
});
