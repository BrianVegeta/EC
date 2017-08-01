/* eslint-disable import/prefer-default-export */
const TYPE = 'ITEMS';
const prefix = action => (
  `${TYPE}.${action}`
);

export const FETCHING = prefix('FETCHING');
export const FETCHED = prefix('FETCHED');
export const INCREASE_PAGING_RECURSIVE_FREQUENCY = prefix('INCREASE_PAGING_RECURSIVE_FREQUENCY');
export const RESET_PAGING_RECURSIVE_FREQUENCY = prefix('RESET_PAGING_RECURSIVE_FREQUENCY');
