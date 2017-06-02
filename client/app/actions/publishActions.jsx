/* eslint-disable import/prefer-default-export */
import {
  PUBLISH_TITLE_UPDATE,
  PUBLISH_DESC_UPDATE,
  PUBLISH_TAGS_UPDATE,

  PUBLISH_SEND_OPTIONS_UPDATE,
  PUBLISH_RETURN_OPTIONS_UPDATE,
  PUBLISH_RETURN_ADDRESS_UPDATE_CITYAREA,
  PUBLISH_RETURN_ADDRESS_UPDATE_DETAIL,

  PUBLISH_PRICE_UPDATE,
  PUBLISH_DEPOSIT_UPDATE,
  PUBLISH_MIN_LEASE_DAYS_UPDATE,
  PUBLISH_DISCOUNTS_UPDATE,


  PUBLISH_REGULATION_UPDATE,
  PUBLISH_CANCEL_POLICY_PURGE,
  PUBLISH_CANCEL_POLICY_UPDATE,
} from '../constants/actionTypes';

export const updateTitle = title => ({
  type: PUBLISH_TITLE_UPDATE,
  title,
});
export const updateDesc = descript => ({
  type: PUBLISH_DESC_UPDATE,
  descript,
});
export const updateTags = hashtags => ({
  type: PUBLISH_TAGS_UPDATE,
  hashtags,
});

export const OPTION_IN_PERSON = 0;
export const OPTION_MAIL = 1;
export const OPTION_SEVEN = 2;
export const updateSendOptions = (optionKey, isChecked) => ({
  type: PUBLISH_SEND_OPTIONS_UPDATE,
  optionKey,
  isChecked,
});
export const updateReturnOptions = (optionKey, isChecked) => ({
  type: PUBLISH_RETURN_OPTIONS_UPDATE,
  optionKey,
  isChecked,
});

export const updateReturnAddressCityarea = (city, area) => ({
  type: PUBLISH_RETURN_ADDRESS_UPDATE_CITYAREA,
  city,
  area,
});
export const updateReturnAddressDetail = detail => ({
  type: PUBLISH_RETURN_ADDRESS_UPDATE_DETAIL,
  detail,
});
// price settings
export const updatePrice = price => ({
  type: PUBLISH_PRICE_UPDATE,
  price,
});
export const updateDeposit = deposit => ({
  type: PUBLISH_DEPOSIT_UPDATE,
  deposit,
});
export const updateMinLeaseDays = minLeaseDays => ({
  type: PUBLISH_MIN_LEASE_DAYS_UPDATE,
  minLeaseDays,
});
export const updateDiscounts = discounts => ({
  type: PUBLISH_DISCOUNTS_UPDATE,
  discounts,
});

// 守則
export const updateRegulation = regulation => ({
  type: PUBLISH_REGULATION_UPDATE,
  regulation,
});
// 退訂
export const updateCancelPolicy = ({ advanceDays, rate }) => ({
  type: PUBLISH_CANCEL_POLICY_UPDATE,
  advanceDays,
  rate,
});
export const purgeCancelPolicy = () => ({
  type: PUBLISH_CANCEL_POLICY_PURGE,
});
