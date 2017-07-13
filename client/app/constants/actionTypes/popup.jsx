/* eslint-disable import/prefer-default-export */
const TYPE = 'POPUP';
const prefix = action => `${TYPE}.${action}`;

export const OPEN = prefix('OPEN');
export const CLOSE = prefix('CLOSE');
