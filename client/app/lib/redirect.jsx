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

export const refreshHard = () =>
  (dispatch, getState) => {
    const {
      routing: {
        locationBeforeTransitions: {
          pathname,
        },
      },
    } = getState();
    window.location.href = pathname;
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


export const redirectAfterLogin = backupPath =>
  (dispatch, getState) => {
    const { routingHelper: { referrer } } = getState();
    if (referrer) {
      window.location.href = referrer || backupPath;
      return;
    }
    const { routing: { locationBeforeTransitions } } = getState();
    const { state } = locationBeforeTransitions;
    // for fire fox
    window.location.href = (state && state.referrer) ? state.referrer : backupPath;
    // browserHistory.push(
    //   (state && state.referrer) ? state.referrer : backupPath,
    // );
  };


export const redirectWithoutHook = pathname =>
  (dispatch, getState) => {
    const { routingHelper: { removeHook } } = getState();
    if (removeHook) removeHook();
    browserHistory.push(pathname);
  };
