/* eslint-disable import/prefer-default-export */
const TYPE = 'ALERT_POPUP';
const prefix = ACTION => `${TYPE}.${ACTION}`;

export const OPEN = prefix('OPEN');
export const CLOSE = prefix('CLOSE');
