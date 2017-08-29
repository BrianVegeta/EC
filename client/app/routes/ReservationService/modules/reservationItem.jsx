import { isEqual } from 'lodash';
import { asyncXhrPost } from 'lib/xhr';
// import moment from 'moment';
// import { REDUCER_KEY as COVER_REDUCER_KEY } from './covers';

/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'RESERVATION.SERVICE.ITEM';
export const REDUCER_KEY = 'reservationServiceItem';

/* enums */
export const ASSIGN_ADDRESS_BY_OWNER = '0';
export const ASSIGN_ADDRESS_BY_CUSTOMER = '1';

// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);

const SET_ITEM = prefix('SET_ITEM');
const UPDATE_OWNER = prefix('UPDATE_OWNER');
const RESET = prefix('RESET');


// =============================================
// = actions =
// =============================================
const setItem = data => ({
  type: SET_ITEM,
  data,
});

const updateOwner = userProfile => ({
  type: UPDATE_OWNER,
  userProfile,
});

export const reset = () => ({
  type: RESET,
});

export const fetchItem = pid =>
  (dispatch) => {
    asyncXhrPost('/ajax/item_detail.json', { pid })
    .then((data) => {
      dispatch(setItem(data));

      const { uid } = data;
      asyncXhrPost('/ajax/user_info.json', { uid })
      .then((userData) => {
        dispatch(updateOwner(userData.user_profile));
      })
      .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
  };


// =============================================
// = reducer =
// =============================================
const initialState = {
  owner: null,
};
export const isStateInitial = state =>
  isEqual(state, initialState);

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEM:
      return Object.assign({}, state, action.data);

    case UPDATE_OWNER: {
      return Object.assign({}, state, {
        owner: action.userProfile,
      });
    }

    case RESET:
      return initialState;

    default:
      return state;
  }
};
