/* eslint-disable import/prefer-default-export */
const TYPE = 'SCHEDULE';
const prefix = action => (
  `${TYPE}.${action}`
);

export const SETUP = prefix('SETUP');
export const START = prefix('START');
export const MOVE_TO_NEXT = prefix('MOVE_TO_NEXT');
export const ABANDON = prefix('ABANDON');
export const DONE = prefix('DONE');
