/* eslint-disable import/prefer-default-export */
import * as TYPES from '../constants/actionTypes';

export const setTitle = title => ({
  type: TYPES.RELEASE_SET_TITLE,
  title,
});
