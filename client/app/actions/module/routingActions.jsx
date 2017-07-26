/* eslint-disable import/prefer-default-export */
import { browserHistory } from 'react-router';

export function redirectTo(pathname) {
  return (dispatch, getState) => {
    const { locationBeforeTransitions } = getState().routing;
    browserHistory.push({
      pathname,
      state: {
        referrer: locationBeforeTransitions.pathname,
      },
    });
  };
}
