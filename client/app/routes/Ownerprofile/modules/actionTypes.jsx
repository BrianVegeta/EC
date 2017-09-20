/* eslint-disable import/prefer-default-export */
const TYPE = 'OWNERPROFILE';
const PREFIX = ACTION => (
  `${TYPE}.${ACTION}`
);

export const FETCHED_USER = PREFIX('FETCHED_USER');
export const FETCHING_USER = PREFIX('FETCHING_USER');
export const FETCHED_WISHLIST = PREFIX('FETCHED_WISHLIST');
export const FETCHING_WISHLIST = PREFIX('FETCHING_WISHLIST');
