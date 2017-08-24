/* eslint-disable import/prefer-default-export */
import { browserHistory } from 'react-router';

/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'ROUTING_HELPER';

// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);
const SET_ROUTE_HOOK = prefix('SET_ROUTE_HOOK');


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

// =============================================
// = reducer =
// =============================================
const initialState = {
  removeHook: null,
};

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_ROUTE_HOOK:
      return Object.assign({}, state, {
        removeHook: action.removeHook,
      });

    default:
      return state;
  }
};
