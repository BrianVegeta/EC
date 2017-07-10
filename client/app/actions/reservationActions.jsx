/* eslint-disable import/prefer-default-export */
import * as types from 'constants/actionTypes/reservation';

export const changeSendOptoin = value => ({
  type: types.CHANGE_SEND_OPTION,
  value,
});

export const changeSendCityarea = (city, area) => ({
  type: types.CHANGE_SEND_CITYAREA,
  city,
  area,
});

export const changeSendAddress = address => ({
  type: types.CHANGE_SEND_ADDRESS,
  address,
});

export const changeReturnOption = value => ({
  type: types.CHANGE_RETURN_OPTION,
  value,
});

export const changeDates = ({ startDate, endDate }) => ({
  type: types.CHANGE_DATES,
  startDate,
  endDate,
});

export const changeAmount = amount => ({
  type: types.CHANGE_AMOUNT,
  amount,
});

export const changeCoupon = (couponNo, couponOffset) => ({
  type: types.CHANGE_COUPON,
  couponNo,
  couponOffset,
});

// FORM COLUMN 更改
export const changeFormData = formData => ({
  type: types.CHANGE_FORM_DATA,
  formData,
});
