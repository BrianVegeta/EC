import { isEqual } from 'lodash';
import { asyncXhrPost } from 'lib/xhr';
import { today } from 'lib/time';
import { changeData } from './reservation';
// import moment from 'moment';
// import { REDUCER_KEY as COVER_REDUCER_KEY } from './covers';

/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'RESERVATION.GOODS.ITEM';
export const REDUCER_KEY = 'reservationGoodsItem';

/* enums */
export const ASSIGN_ADDRESS_BY_OWNER = '0';
export const ASSIGN_ADDRESS_BY_CUSTOMER = '1';
export const SEND_BY_IN_PERSON = '0';
export const SEND_BY_OTHER_SHIPPMENT = '1';
export const SEND_BY_711 = '2';
export const RETURN_BY_IN_PERSON = '0';
export const RETURN_BY_OTHER_SHIPPMENT = '1';
export const RETURN_BY_711 = '2';
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
      const { send_option, return_option,
        return_city, return_area, return_address } = data;
      let sendOption = [];
      let returnOption = [];
      sendOption = appendOption(sendOption,
        send_option, SEND_BY_IN_PERSON, '面交（自行協調取貨地點）');
      sendOption = appendOption(sendOption,
        send_option, SEND_BY_OTHER_SHIPPMENT, '自行寄送');
      sendOption = appendOption(sendOption,
        send_option, SEND_BY_711, '7-11交貨便');
      returnOption = appendOption(returnOption,
        return_option, RETURN_BY_IN_PERSON, '面交（自行協調取貨地點）');
      returnOption = appendOption(returnOption,
        return_option, RETURN_BY_OTHER_SHIPPMENT, '自行寄送');
      returnOption = appendOption(returnOption,
        return_option, RETURN_BY_711, '7-11交貨便');

      const record = Object.assign({}, data, { sendOption, returnOption });

      dispatch(setItem(record));
      dispatch(changeData({
        returnCity: return_city,
        returnArea: return_area,
        returnAddress: return_address,
      }));
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
