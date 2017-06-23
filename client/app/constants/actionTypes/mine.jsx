/* eslint-disable import/prefer-default-export */
const TYPE = 'MINE';
const PREFIX = ACTION => (
  `${TYPE}.${ACTION}`
);

export const ITEMS_FETCHED = PREFIX('ITEMS_FETCHED');
export const ITEMS_TAB = PREFIX('ITEMS_TAB');
export const ITEMS_EDITING = PREFIX('ITEMS_EDITING');
export const ITEMS_CANCEL_EDITING = PREFIX('ITEMS_CANCEL_EDITING');
export const ITEMS_ADD_TO_DELETE = PREFIX('ITEMS_ADD_TO_DELETE');
export const ITEMS_DELETE = PREFIX('ITEMS_DELETE');
