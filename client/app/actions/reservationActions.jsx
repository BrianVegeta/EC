/* eslint-disable import/prefer-default-export */
import * as TYPES from 'constants/actionTypes/reservation';

export const changeSendOptoin = option => ({
  type: TYPES.CHANGE_SEND_OPTION,
  option,
});
export const changeSendCityarea = (city, area) => ({
  type: TYPES.CHANGE_SEND_CITYAREA,
  city,
  area,
});
export const changeSendAddress = address => ({
  type: TYPES.CHANGE_SEND_ADDRESS,
  address,
});
export const changeReturnOption = option => ({
  type: TYPES.CHANGE_RETURN_OPTION,
  option,
});
