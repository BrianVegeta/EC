/* eslint-disable import/prefer-default-export */

export function confirmLeavePage(e, message) {
  e.returnValue = message || '?';
  return message;
}
