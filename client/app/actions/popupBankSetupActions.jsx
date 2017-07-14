/* eslint-disable import/prefer-default-export */

import * as types from 'constants/actionTypes/popupBankSetup';

export const changeData = data => ({
  type: types.CHANGE_DATA,
  data,
});
