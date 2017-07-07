/* eslint-disable import/prefer-default-export */
const TYPE = 'MY_COUPONS';
const prefix = ACTION => `${TYPE}.${ACTION}`;

export const REQUEST_COUPONS = prefix('REQUEST_COUPONS');
export const RECEIVE_COUPONS = prefix('RECEIVE_COUPONS');
