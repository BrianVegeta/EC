/* eslint-disable import/prefer-default-export */
const TYPE = 'MINE';
const PREFIX = ACTION => (
  `${TYPE}.${ACTION}`
);

export const ITEMS_FETCHED = PREFIX('ITEMS_FETCHED');
export const ITEMS_TAB = PREFIX('ITEMS_TAB');
