import { asyncXhrGet } from 'lib/xhr';

/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'CATEGORIES';


// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);
const SET_CATEGORIES = prefix('SET_CATEGORIES');


// =============================================
// = actions =
// =============================================

const setCategories = categories => ({
  type: SET_CATEGORIES,
  categories,
});

export function fetchCategories() {
  return (dispatch) => {
    asyncXhrGet('/ajax/categories.json').then((data) => {
      dispatch(setCategories(data));
    }).catch(() => {});
  };
}


// =============================================
// = reducer =
// =============================================
export const initialState = {};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.categories;

    default:
      return state;
  }
};
