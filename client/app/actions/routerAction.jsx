/* eslint-disable import/prefer-default-export */
import { browserHistory } from 'react-router';

export function checkStepRestart(path) {
  return (dispatch, getState) => {
    const { routing } = getState();
    const { pathname } = routing.locationBeforeTransitions;
    if (pathname !== path) {
      browserHistory.push(path);
    }
  };
}
