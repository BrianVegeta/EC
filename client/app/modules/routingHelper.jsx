/* eslint-disable import/prefer-default-export */
import { browserHistory } from 'react-router';
import { loginPath, registrationPath, forgotPasswordPath } from 'lib/paths';

/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'ROUTING_HELPER';

// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);
const SET_ROUTE_HOOK = prefix('SET_ROUTE_HOOK');
const SET_REFERRER = prefix('SET_REFERRER');


// =============================================
// = actions =
// =============================================
export const checkStepsRestart = path =>
  (dispatch, getState) => {
    const { routing } = getState();
    const { pathname, search } = routing.locationBeforeTransitions;
    if (`${pathname}${search}` !== path) browserHistory.push(path);
  };

export const setRouteHook = removeHook => ({
  type: SET_ROUTE_HOOK,
  removeHook,
});

export const setReferrerPath = location =>
  (dispatch) => {
    const { pathname } = location;
    const exclusion = [loginPath, registrationPath, forgotPasswordPath];
    if (exclusion.includes(pathname)) return;
    dispatch({
      type: SET_REFERRER,
      path: pathname,
    });
  };

// =============================================
// = reducer =
// =============================================
const initialState = {
  removeHook: null,
  referrer: null,
};

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_ROUTE_HOOK:
      return Object.assign({}, state, {
        removeHook: action.removeHook,
      });

    case SET_REFERRER:
      return Object.assign({}, state, {
        referrer: action.path,
      });

    default:
      return state;
  }
};
