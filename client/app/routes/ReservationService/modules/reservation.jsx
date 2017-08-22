import { isEqual } from 'lodash';
import { asyncXhrAuthedPost } from 'lib/xhr';
import {
  REDUCER_KEY as ITEM_REDUCER_KEY,
} from './reservationItem';

/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'RESERVATION.SERVICE';
export const REDUCER_KEY = 'reservationService';
export const PAYMENT_TYPE_ATM = 1;
export const PAYMENT_TYPE_CREDIT_CARD = 4;

// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);

const CHANGE_DATA = prefix('CHANGE_DATA');
const TOUCH_PATH = prefix('TOUCH_PATH');
const RESET = prefix('RESET');


// =============================================
// = actions =
// =============================================

export const changeData = data => ({
  type: CHANGE_DATA,
  data,
});

export const touchPath = path => ({
  type: TOUCH_PATH,
  path,
});

export const reset = () => ({
  type: RESET,
});

// # pid : long => 商品ID
// # unit : int => 數量;
// # paymenttype : int => 交易類型  1:ATM 4:信用卡;
// # service_location_type : String => 服務合約時 , 記錄由誰指定服務地址 0:分享人 1:享用人
// # service_city : String 服務城市
// # service_area : String 服務地區
// # service_address : String 服務地址
// # leasestart : Long => 合約開始時間
// # leaseend : Ｌong =>  合約結束時間
// # coupon_no : String => 折價卷的代號
// # note : String => 文字
const transformParams = (pid, assignAddressType, {
  paymenttype,
  serviceLocationType, serviceCity, serviceArea, serviceAddress,
  leasestart, leaseend,
  couponNo, unit,
  note,
}) => ({
  pid,
  leasestart: leasestart.valueOf(),
  leaseend: leaseend.valueOf(),
  unit,
  note,
  coupon_no: couponNo,
  service_location_type: assignAddressType.length > 1 ?
    serviceLocationType : assignAddressType,
  service_city: serviceCity,
  service_area: serviceArea,
  service_address: serviceAddress,
  paymenttype,
});
export const saveReservation = () =>
  (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const reservation = getState()[REDUCER_KEY];
      const { pid, assign_address_type } = getState()[ITEM_REDUCER_KEY];
      asyncXhrAuthedPost(
        '/ajax/reserve_service.json',
        transformParams(pid, assign_address_type, reservation),
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
  touchedStepPaths: [],
  leasestart: null,
  leaseend: null,
  couponNo: null,
  serviceLocationType: null,
  serviceCity: '',
  serviceArea: '',
  serviceAddress: '',
  note: '',
  unit: 1,
  paymenttype: null,
  isAgree: false,
};
export const isStateInitial = state =>
  isEqual(state, initialState);

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DATA:
      return Object.assign({}, state, action.data);

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
