/* eslint-disable import/prefer-default-export */
import * as types from 'constants/actionTypes/modal';

export const openModal = (component, data) => ({
  type: types.OPEN,
  component,
  data,
});
