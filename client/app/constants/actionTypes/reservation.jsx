/* eslint-disable import/prefer-default-export */
const TYPE = 'RESERVATION';
const PREFIX = ACTION => `${TYPE}.${ACTION}`;

export const CHANGE_SEND_OPTION = PREFIX('CHANGE_SEND_OPTION');
export const CHANGE_SEND_CITYAREA = PREFIX('CHANGE_SEND_CITYAREA');
export const CHANGE_SEND_ADDRESS = PREFIX('CHANGE_SEND_ADDRESS');
export const CHANGE_RETURN_OPTION = PREFIX('CHANGE_RETURN_OPTION');

export const CHANGE_DATES = PREFIX('CHANGE_DATES');
export const CHANGE_AMOUNT = PREFIX('CHANGE_AMOUNT');
