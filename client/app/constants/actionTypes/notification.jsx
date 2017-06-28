/* eslint-disable import/prefer-default-export */
const TYPE = 'NOTIFICATION';
const PREFIX = ACTION => (
  `${TYPE}.${ACTION}`
);

export const SET_NOTIFICATIONS = PREFIX('SET_NOTIFICATIONS');
