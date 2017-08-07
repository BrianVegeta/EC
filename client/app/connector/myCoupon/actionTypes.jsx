/* eslint-disable import/prefer-default-export */
const TYPE = 'MY_COUPONS';
const prefix = action => `${TYPE}.${action}`;

export const FETCHED = prefix('FETCHED');
export const FETCHING = prefix('FETCHING');
