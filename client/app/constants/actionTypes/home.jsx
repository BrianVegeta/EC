/* eslint-disable import/prefer-default-export */
const TYPE = 'HOME';
const PREFIX = ACTION => (
  `${TYPE}.${ACTION}`
);

export const STARTUP = PREFIX('STARTUP');
