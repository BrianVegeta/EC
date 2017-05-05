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

export const updateCityzone = cityzone => ({
  type: TYPES.ITEM_RELEASE_FORM_SET_CITYZONE,
  cityzone,
});

export const updateShipping = shipping => ({
  type: TYPES.ITEM_RELEASE_FORM_SET_SHIPPING,
  shipping,
});

export const updateShippingDays = shippingDays => ({
  type: TYPES.ITEM_RELEASE_FORM_SET_SHIPPING_DAYS,
  shippingDays,
});
