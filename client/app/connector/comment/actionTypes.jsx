/* eslint-disable import/prefer-default-export */
const TYPE = 'COMMENT';
const PREFIX = ACTION => (
  `${TYPE}.${ACTION}`
);

export const FETCHED = PREFIX('FETCHED');
export const FETCHING = PREFIX('FETCHING');
export const RESET = PREFIX('RESET');
