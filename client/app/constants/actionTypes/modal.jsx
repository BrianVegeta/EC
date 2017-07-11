/* eslint-disable import/prefer-default-export */
const TYPE = 'MODAL';
const PREFIX = ACTION => (
  `${TYPE}.${ACTION}`
);

export const OPEN = PREFIX('OPEN');
