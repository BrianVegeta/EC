/* eslint-disable camelcase */
import { isEqual } from 'lodash';
import swal, { warningConfig } from 'lib/swal';
import { asyncXhrAuthedPost } from 'lib/xhr';
import { now, getMoment } from 'lib/time';
import { my } from 'lib/paths';
import { redirectWithoutHook } from 'lib/redirect';
import {
  REDUCER_KEY as ITEM_REDUCER_KEY,
} from './reservationItem';

/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'RESERVATION.SERVICE';
export const REDUCER_KEY = 'reservationGoods';
export const PAYMENT_TYPE_ATM = 1;
export const PAYMENT_TYPE_CREDIT_CARD = 4;

// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);

const CHANGE_DATA = prefix('CHANGE_DATA');
const CHANGE_MONTH = prefix('CHANGE_MONTH');
const FETCHED_FOR_EDIT = prefix('FETCHED_FOR_EDIT');
const TOUCH_PATH = prefix('TOUCH_PATH');
const RESET = prefix('RESET');


// =============================================
// = actions =
// =============================================

export const changeData = data => ({
  type: CHANGE_DATA,
  data,
});

export const changeMonth = (leasestart, month) => ({
  type: CHANGE_MONTH,
  leasestart,
  month,
});

export const fetchedForEdit = data => ({
  type: FETCHED_FOR_EDIT,
  data,
});

export const touchPath = path => ({
  type: TOUCH_PATH,
  path,
});

export const reset = () => ({
  type: RESET,
});

const transformState = ({
  leasestart, leaseend, coupon: { couponNo },
  send_type, return_type,
  item_lessee_receive_city, item_lessee_receive_area, item_lessee_receive_address,
  item_owner_receive_city, item_owner_receive_area, item_owner_receive_address,
  note, unit, paymenttype,
  lessee_receive_711_store_id, lessee_receive_711_store_name, lessee_receive_711_store_address,
}) => ({
  leasestart: leasestart ? getMoment(leasestart) : null,
  leaseend: leaseend ? getMoment(leaseend) : null,
  couponNo: couponNo || null,
  sendType: send_type,
  returnType: return_type,
  sendCity: item_lessee_receive_city,
  sendArea: item_lessee_receive_area,
  sendAddress: item_lessee_receive_address,
  returnCity: item_owner_receive_city,
  returnArea: item_owner_receive_area,
  returnAddress: item_owner_receive_address,
  storeid: lessee_receive_711_store_id,
  storename: lessee_receive_711_store_name,
  storeaddress: lessee_receive_711_store_address,
  note: note || '',
  unit: unit || 1,
  paymenttype: paymenttype || null,
});

export const editReservation = cid =>
  (dispatch, getState) => {
    asyncXhrAuthedPost(
      '/ajax/get_order.json', { cid }, getState(), true,
    ).then((data) => {
      if (!data.display.can_edit) {
        dispatch(redirectWithoutHook(my.lesseeOrderService('TAB_REQUEST')));
        swal(warningConfig({
          title: '還不能修改',
          text: '等待對方同意中不能修改預訂內容。',
        }));
        return;
      }
      dispatch(fetchedForEdit(transformState(data)));
    }).catch(error => console.log(error));
  };

const transformParams = (pid, assignAddressType, {
  paymenttype,
  sendType, returnType,
  sendCity, sendArea, sendAddress,
  returnCity, returnArea, returnAddress,
  leasestart, leaseend,
  couponNo, unit,
  note,
  storeid, storename, storeaddress,
}) => ({
  pid,
  leasestart: leasestart ? leasestart.valueOf() : null,
  leaseend: leaseend ? leaseend.valueOf() : null,
  unit,
  note,
  coupon_no: couponNo,
  send_type: sendType,
  return_type: returnType,
  item_lessee_receive_city: sendCity,
  item_lessee_receive_area: sendArea,
  item_lessee_receive_address: sendAddress,
  item_owner_receive_city: returnCity,
  item_owner_receive_area: returnArea,
  item_owner_receive_address: returnAddress,
  lessee_receive_711_store_id: storeid,
  lessee_receive_711_store_name: storename,
  lessee_receive_711_store_address: storeaddress,
  paymenttype,
});

export const saveReservation = () =>
  (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const reservation = getState()[REDUCER_KEY];
      const { pid, assign_address_type } = getState()[ITEM_REDUCER_KEY];
      asyncXhrAuthedPost(
        '/ajax/reserve_goods.json',
        transformParams(pid, assign_address_type, reservation),
        getState(),
        true,
      ).then((data) => {
        resolve(data);
      }).catch((error) => {
        reject(error);
      });
    });

export const updateReservation = cid =>
  (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const reservation = getState()[REDUCER_KEY];
      const { pid, assign_address_type } = getState()[ITEM_REDUCER_KEY];
      const params = transformParams(pid, assign_address_type, reservation);

      asyncXhrAuthedPost(
        '/ajax/reserve_goods_update.json',
        Object.assign({}, params, { cid }),
        getState(),
        true,
      ).then((data) => {
        resolve(data);
      }).catch((error) => {
        reject(error);
      });
    });


// =============================================
// = reducer =
// =============================================
const initialState = {
  fetchedAt: null,
  touchedStepPaths: [],
  leasestart: null,
  leaseend: null,
  couponNo: null,
  sendType: null,
  returnType: null,
  sendCity: '',
  sendArea: '',
  sendAddress: '',
  returnCity: '',
  returnArea: '',
  returnAddress: '',
  month: 1,
  note: '',
  unit: 1,
  paymenttype: null,
  isAgree: false,
  storeid: '',
  storename: '',
  storeaddress: '',
};
export const isStateInitial = state =>
  isEqual(state, initialState);

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DATA:
      return Object.assign({}, state, action.data);

    case CHANGE_MONTH: {
      const leasestart = (action.leasestart) ? action.leasestart : state.leasestart;
      const month = (action.month) ? action.month : state.month;
      if (leasestart) {
        const leaseend = leasestart.clone();
        leaseend.add(month, 'M');
        return Object.assign({}, state, { month, leasestart, leaseend });
      }
      return Object.assign({}, state, { month });
    }

    case FETCHED_FOR_EDIT: {
      const newState = Object.assign({}, action.data, { fetchedAt: now() });
      return Object.assign({}, state, newState);
    }

    case TOUCH_PATH: {
      if (state.touchedStepPaths.includes(action.path)) {
        return state;
      }
      return Object.assign({}, state, {
        touchedStepPaths: state.touchedStepPaths.concat(action.path),
      });
    }

    case RESET:
      return initialState;

    default:
      return state;
  }
};
