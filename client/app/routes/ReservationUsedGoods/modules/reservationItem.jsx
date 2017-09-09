import { isEqual } from 'lodash';
import { asyncXhrPost } from 'lib/xhr';
import { today } from 'lib/time';

// import moment from 'moment';
// import { REDUCER_KEY as COVER_REDUCER_KEY } from './covers';

/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'RESERVATION.SERVICE.ITEM';
export const REDUCER_KEY = 'reservationGoodsItem';

/* enums */
export const ASSIGN_ADDRESS_BY_OWNER = '0';
export const ASSIGN_ADDRESS_BY_CUSTOMER = '1';
export const SEND_BY_IN_PERSON = '0';
export const SEND_BY_OTHER_SHIPPMENT = '1';


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

function appendOption(list, str, target, text) {
  if (str.search(target) > -1) {
    list.push({ value: target, text });
  }
  return list;
}

export const fetchItem = pid =>
  (dispatch) => {
    asyncXhrPost('/ajax/item_detail.json', { pid })
    .then((data) => {
      const { send_option } = data;
      let sendOption = [];
      sendOption = appendOption(sendOption,
        send_option, SEND_BY_IN_PERSON, '面交（自行協調取貨地點）');
      sendOption = appendOption(sendOption,
        send_option, SEND_BY_OTHER_SHIPPMENT, '自行寄送');

      const record = Object.assign({}, data, { sendOption });

      dispatch(setItem(record));
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
  earliestStart: today(),
  sendOption: [],
  returnOption: [],
};
export const isStateInitial = state =>
  isEqual(state, initialState);

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEM: {
      return Object.assign({}, state, action.data);
    }


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
