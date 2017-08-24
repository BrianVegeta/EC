/* eslint-disable import/prefer-default-export */
import { browserHistory } from 'react-router';

export const redirectToWithReferrer = pathname =>
  (dispatch, getState) => {
    const { routing: { locationBeforeTransitions } } = getState();
    const referrerPath = locationBeforeTransitions.pathname;
    browserHistory.push({
      pathname,
      state: {
        referrer: referrerPath,
      },
    });
  };

export const refreshRoute = () =>
  (dispatch, getState) => {
    const {
      routing: {
        locationBeforeTransitions: {
          pathname,
        },
      },
    } = getState();

    browserHistory.push({
      pathname,
      state: {
        forceChange: true,
      },
    });
  };
