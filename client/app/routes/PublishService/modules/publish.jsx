// import { asyncXhrPost } from 'lib/xhr';

/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'PUBLISH';
// const REDUCER_KEY = 'publish';


// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);

export const CHANGE_DATA = prefix('CHANGE_DATA');
export const RESET = prefix('RESET');


// =============================================
// = actions =
// =============================================

export const changeData = data => ({
  type: CHANGE_DATA,
  data,
});

export const reset = () => ({
  type: RESET,
});


// =============================================
// = reducer =
// =============================================
const initialState = {
  title: '',
  descript: '',
  cityName: '',
  areaName: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DATA:
      return Object.assign({}, state, action.data);

    case RESET:
      return initialState;

    default:
      return state;
  }
};
