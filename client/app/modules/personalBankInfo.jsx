// remove popupBankSetupActions.jsx
// remove bankaccActions.jsx
import {
  isEmpty,
} from 'lodash';
import validate from 'validate.js';
import { Map } from 'immutable';
import { asyncXhrAuthedGet, asyncXhrAuthedPost } from 'lib/xhr';
import constraints from 'constraints/bankSetup';
/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'PERSONAL_BANK_INFO';
export const REDUCER_KEY = 'personalBankInfo';


// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);

const RESET = prefix('RESET');
const RESET_BANK_INFO = prefix('RESET_BANK_INFO');
const CHANGE_INFO = prefix('CHANGE_INFO');
const CHANGE_DATA = prefix('CHANGE_DATA');
const SET_INFO_FETCHED = prefix('SET_INFO_FETCHED');
const CHANGE_PASSWORD = prefix('CHANGE_PASSWORD');
const SET_READY_STATE = prefix('SET_READY_STATE');


// =============================================
// = actions =
// =============================================
export const reset = () => ({
  type: RESET,
});

export const resetBankInfo = () => ({
  type: RESET_BANK_INFO,
});

export const changeInfo = info => ({
  type: CHANGE_INFO,
  info,
});

export const changeData = data => ({
  type: CHANGE_DATA,
  data,
});

export const setInfoFetched = () => ({
  type: SET_INFO_FETCHED,
});

export const changePassword = password => ({
  type: CHANGE_PASSWORD,
  password,
});

const setReadyState = ({ isReady, bankName, hasPassword }) => ({
  type: SET_READY_STATE,
  isReady,
  bankName,
  hasPassword,
});

const unzipInfo = ({ BKN, BKBR, BRN, PH, EM, BN, BA, RN, CID }) => ({
  realName: RN,
  idNumber: CID,
  phone: PH,
  email: EM,
  accBankId: BKBR.slice(0, 3),
  accBankBranchId: BKBR.slice(3, 7),
  accBankName: BKN,
  accBankBranchName: BRN,
  accName: BN,
  accNo: BA,
});

const zipInfo = ({
  realName, idNumber, phone, email,
  accBankId, accBankBranchId, accBankName, accBankBranchName, accName, accNo,
}) => ({
  RN: realName,
  CID: idNumber,
  PH: phone,
  EM: email,
  BKBR: `${accBankId}${accBankBranchId}`,
  BKN: accBankName,
  BRN: accBankBranchName,
  BN: accName,
  BA: accNo,
});
// bankName: BKN, // 銀行名稱
// bankNumber: BKBR, // 000[-]0000
// bankBranchName: BRN, // 羅斯福分行
// phone: PH, // 0972888888
// email: EM, // phyala@mailnesia.com
// accName: BN, // 戶名（ＸＸＸ）
// accNumber: BA, // 0000000000000000000
// realName: RN, // ＸＸＸ
// idNumber: CID, // R123123123

// realName: unzipBankInfo(data).bankName,
// identityNo: unzipBankInfo(data).idNumber,
// phone: unzipBankInfo(data).phone,
// email: unzipBankInfo(data).email,
// accBankId: unzipBankInfo(data).bankNumber.slice(0, 3),
// accBankBranchId: unzipBankInfo(data).bankNumber.slice(3, 7),
// accName: unzipBankInfo(data).accName,
// accNo: unzipBankInfo(data).accNumber,

export const fetchInfo = () =>
  (dispatch, getState) =>
    asyncXhrAuthedPost(
      '/ajax/bank/bankacc.json',
      {},
      getState(),
    ).then((data) => {
      const info = unzipInfo(data);
      dispatch(changeInfo(info));
      dispatch(setInfoFetched());
    }).catch(() => {});

/**
 * check setting ready
 * response data: -1, 0, 1
 *
 */
export const asyncCheckReady = () =>
  (dispatch, getState) =>
    new Promise((resolve, reject) => {
      asyncXhrAuthedGet(
        '/ajax/bank/bankacc/info_ready.json',
        getState(),
      ).then((data) => {
        dispatch(setReadyState(data));
      }).catch(error => reject(error));
    });

export const checkReadyAndSet = () =>
  dispatch =>
    dispatch(asyncCheckReady()).then().catch();

export const validateInfo = () =>
  (dispatch, getState) => {
    const { info } = getState()[REDUCER_KEY];
    return new Promise((resolve, reject) => {
      const errors = validate(info, {
        realName: constraints.realName,
        idNumber: constraints.idNumber,
        phone: constraints.phone,
        email: constraints.email,
        accBankId: constraints.accBankId,
        accBankBranchId: constraints.accBankBranchId,
        accName: constraints.accName,
        accNo: constraints.accNo,
      });
      if (isEmpty(errors)) {
        resolve();
      } else {
        reject(errors);
      }
    });
  };

/* 儲存銀行資料 */
export const saveBankInfo = () =>
  (dispatch, getState) => {
    const { info } = getState()[REDUCER_KEY];
    const { accBankName } = info;
    return new Promise((resolve, reject) => {
      asyncXhrAuthedPost(
        '/ajax/bank/bankacc_update.json',
        { data: zipInfo(info) },
        getState(),
      ).then(() => {
        resolve({ bankName: accBankName });
      }).catch(error => reject(error));
    });
  };


// =============================================
// = reducer =
// =============================================
const initialState = {
  isChecked: false,
  isReady: false,
  bankName: '',
  hasPassword: false,

  infoFetched: false,
  info: {
    realName: '',
    idNumber: '',
    phone: '',
    email: '',
    accBankId: '',
    accBankBranchId: '',
    accBankName: '',
    accBankBranchName: '',
    accName: '',
    accNo: '',
  },
  password: '',
};

export default (state = initialState, action) => {
  switch (action.type) {

    case RESET:
      return initialState;

    case RESET_BANK_INFO:
      return Object.assign({}, state, {
        infoFetched: initialState.infoFetched,
        info: initialState.info,
        password: initialState.password,
      });

    case CHANGE_INFO:
      return Map(state).update(
        'info',
        info => Object.assign({}, info, action.info),
      ).toJS();

    case CHANGE_DATA:
      return Object.assign({}, state, action.data);

    case SET_INFO_FETCHED:
      return Object.assign({}, state, { infoFetched: true });

    case CHANGE_PASSWORD:
      return Object.assign({}, state, { password: action.password });

    case SET_READY_STATE:
      return Map(state).set('isChecked', true)
        .set('isReady', action.isReady)
        .set('bankName', action.bankName)
        .set('hasPassword', action.hasPassword)
        .toJS();

    default:
      return state;
  }
};
