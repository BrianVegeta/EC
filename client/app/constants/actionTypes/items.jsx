/* eslint-disable import/prefer-default-export */
const TYPE = 'ITEMS';
const prefix = action => (
  `${TYPE}.${action}`
);

export const FETCHING = prefix('FETCHING');
export const FETCHED = prefix('FETCHED');
