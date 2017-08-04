/* eslint-disable import/prefer-default-export */
const TYPE = 'MYCOLLECTION';
const PREFIX = ACTION => (
  `${TYPE}.${ACTION}`
);

export const FETCHED = PREFIX('FETCHED');
export const FETCHING = PREFIX('FETCHING');
