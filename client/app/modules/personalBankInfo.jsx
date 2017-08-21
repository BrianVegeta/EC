// remove popupBankSetupActions.jsx
// remove bankaccActions.jsx

import { Map } from 'immutable';
import { asyncXhrAuthedGet, asyncXhrAuthedPost } from 'lib/xhr';
/* =============================================>>>>>
= settings =
===============================================>>>>>*/
const ACTION_PREFIX = 'PERSONAL_BANK_INFO';


// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);

const RESET = prefix('RESET');
const CHANGE_INFO = prefix('CHANGE_INFO');
const CHANGE_PASSWORD = prefix('CHANGE_PASSWORD');
const SET_READY_STATE = prefix('SET_READY_STATE');


// =============================================
// = actions =
// =============================================
export const reset = () => ({
  type: RESET,
});

export const changeInfo = info => ({
  type: CHANGE_INFO,
  info,
});

export const changePassword = password => ({
  type: CHANGE_PASSWORD,
  password,
});

const setReadyState = isReady => ({
  type: SET_READY_STATE,
  isReady,
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
      getState(),
    ).then((data) => {
      const info = unzipInfo(data);
      dispatch(changeInfo(info));
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
        '/ajax/bank/bankacc/ready.json',
        getState(),
      ).then((isReady) => {
        dispatch(setReadyState(!!isReady));
      }).catch(error => reject(error));
    });

export const checkReadyAndSet = () =>
  dispatch =>
    dispatch(asyncCheckReady())
    .then()
    .catch();


// =============================================
// = reducer =
// =============================================
const initialState = {
  isChecked: false,
  isReady: false,

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

    case CHANGE_INFO:
      return Map(state).update(
        'info',
        info => Object.assign({}, info, action.info),
      ).toJS();

    case CHANGE_PASSWORD:
      return Object.assign({}, state, { password: action.password });

    case SET_READY_STATE:
      return Object.assign({}, state, {
        isChecked: true,
        isReady: action.isReady,
      });

    default:
      return state;
  }
};
