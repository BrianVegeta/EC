/* eslint-disable import/prefer-default-export */
import * as TYPES from 'constants/actionTypes/reservation';

export const changeSendOptoin = value => ({
  type: TYPES.CHANGE_SEND_OPTION,
  value,
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

export const changeReturnOption = value => ({
  type: TYPES.CHANGE_RETURN_OPTION,
  value,
});

export const changeDates = ({ startDate, endDate }) => ({
  type: TYPES.CHANGE_DATES,
  startDate,
  endDate,
});

export const changeAmount = amount => ({
  type: TYPES.CHANGE_AMOUNT,
  amount,
});

export const changeCoupon = (couponNo, couponOffset) => ({
  type: TYPES.CHANGE_COUPON,
  couponNo,
  couponOffset,
});
