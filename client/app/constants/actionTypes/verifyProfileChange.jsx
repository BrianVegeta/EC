/* eslint-disable import/prefer-default-export */
const TYPE = 'VERIFY_PROFILE_CHANGE';
const prefix = action => (
  `${TYPE}.${action}`
);

export const STATE_INIT = prefix('STATE_INIT');
export const STATE_INPUT_PENDING = prefix('INPUT_PENDING');
export const STATE_VERIFYING = prefix('STATE_VERIFYING');
export const STATE_VERIFIED = prefix('STATE_VERIFIED');
