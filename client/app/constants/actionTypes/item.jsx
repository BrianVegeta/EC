/* eslint-disable import/prefer-default-export */
const TYPE = 'ITEM';
const PREFIX = ACTION => `${TYPE}.${ACTION}`;

export const SET_EDIT = PREFIX('SET_EDIT');
export const CHANGE_OWNER = PREFIX('CHANGE_OWNER');
