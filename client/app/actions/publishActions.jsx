/* eslint-disable import/prefer-default-export */
import _ from 'lodash';
import {
  PUBLISH_TITLE_UPDATE,
  PUBLISH_DESC_UPDATE,
  PUBLISH_CITY_AREA_UPDATE,
  PUBLISH_AMOUNT_UPDATE,
  PUBLISH_TAGS_UPDATE,
  PUBLISH_CATEGORY_UPDATE,

  PUBLISH_SHIP_DAYS_UPDATE,
  PUBLISH_SEND_OPTIONS_UPDATE,
  PUBLISH_RETURN_OPTIONS_UPDATE,
  PUBLISH_RETURN_ADDRESS_UPDATE_CITYAREA,
  PUBLISH_RETURN_ADDRESS_UPDATE_DETAIL,
  PUBLISH_CONTACT_NAME_UPDATE,
  PUBLISH_CONTACT_PHONE_UPDATE,

  PUBLISH_PRICE_UPDATE,
  PUBLISH_DEPOSIT_UPDATE,
  PUBLISH_OVERDUE_POLICY_UPDATE,
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
export const updateCityArea = (city, area) => ({
  type: PUBLISH_CITY_AREA_UPDATE,
  city,
  area,
});
export const updateAmount = amount => ({
  type: PUBLISH_AMOUNT_UPDATE,
  amount,
});
export const updateTags = hashtags => ({
  type: PUBLISH_TAGS_UPDATE,
  hashtags,
});
export const updateCategory = categoryId => ({
  type: PUBLISH_CATEGORY_UPDATE,
  categoryId,
});
export const getCategoryFromId = (categoryId, categories) => {
  let parentCategory = null;
  let category = null;
  _.forEach(categories, parentCate =>
    _.forEach(parentCate.subcates, (cate) => {
      if (cate.id === _.parseInt(categoryId)) {
        category = cate;
        parentCategory = parentCate;
        return false;
      }
      return true;
    }),
  );
  return { parentCategory, category };
};

export const updateShipBeforeStartDays = shipBeforeStartDays => ({
  type: PUBLISH_SHIP_DAYS_UPDATE,
  shipBeforeStartDays,
});
// TODO: useless const
export const OPTION_IN_PERSON = 0;
export const OPTION_MAIL = 1;
export const OPTION_SEVEN = 2;

export const updateSendOptions = options => ({
  type: PUBLISH_SEND_OPTIONS_UPDATE,
  options,
});
export const updateReturnOptions = options => ({
  type: PUBLISH_RETURN_OPTIONS_UPDATE,
  options,
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
// contact name
export const updateContactName = name => ({
  type: PUBLISH_CONTACT_NAME_UPDATE,
  name,
});
// contact phone
export const updateContactPhone = phone => ({
  type: PUBLISH_CONTACT_PHONE_UPDATE,
  phone,
});

// STEP4 price settings
export const updatePrice = price => ({
  type: PUBLISH_PRICE_UPDATE,
  price,
});
export const updateDeposit = deposit => ({
  type: PUBLISH_DEPOSIT_UPDATE,
  deposit,
});
export const updateOverduePolicy = percentage => ({
  type: PUBLISH_OVERDUE_POLICY_UPDATE,
  percentage,
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
