import { forEach } from 'lodash';
import { asyncXhrAuthedPost } from 'lib/xhr';
import { popupFetching, popupFetched } from 'modules/popup';
import { REDUCER_KEY as personalBankInfoKey } from 'modules/personalBankInfo';
import { fetchedSendSeven, fetchedReturnSeven } from './orderdetail';

/* =============================================>>>>>
= userprofile =
===============================================>>>>>*/

const ACTION_PREFIX = 'ORDER.ACTION';
// const REDUCER_KEY = 'orderaction';

// =============================================
// = action type =
// =============================================

const prefix = action => (`${ACTION_PREFIX}.${action}`);

const LOCK = prefix('LOCK');
const SUCCESSS = prefix('REJECT');
const FAILED = prefix('FAILED');
const RESET = prefix('RESET');
const SET_ESUN_FORM = prefix('SET_ESUN_FORM');

export const OWNER_SEND = 'OWNER_SEND';
export const LESSEE_RECEIVE = 'LESSEE_RECEIVE';
export const LESSEE_SEND = 'LESSEE_SEND';
export const OWNER_RECEIVE = 'OWNER_RECEIVE';

// =============================================
// = CONSTANT FOR API USAGE =
// =============================================

// =============================================
// = actions =
// =============================================
const success = requestId => ({
  type: SUCCESSS,
  requestId,
});

const failed = errMsg => ({
  type: FAILED,
  errMsg,
});

const lock = (requestId, actionName) => ({
  type: LOCK,
  requestId,
  actionName,
});

// const setEsunForm = form => ({
//   type: SET_ESUN_FORM,
//   form,
// });

export const resetAction = () => ({
  type: RESET,
});

export function doAccept(cid) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const { isReady } = getState()[personalBankInfoKey];
      if (!isReady) {
        reject('銀行帳戶尚未設定');
        return;
      }
      const requestId = Date.now();

      dispatch(lock(requestId, 'accept'));
      const isCatch = true;
      asyncXhrAuthedPost(
        '/ajax/accept_order.json',
        { cid }, getState(), isCatch,
      )
      .then(() => {
        dispatch(success(requestId));
        resolve();
      })
      .catch(() => {
        dispatch(failed('失敗'));
        reject('失敗');
      });
    });
}

export function doShipGoods(cid) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const requestId = Date.now();

      dispatch(lock(requestId, 'reject'));
      const isCatch = true;
      asyncXhrAuthedPost(
        '/ajax/ship_item_goods.json',
        { cid }, getState(), isCatch,
      )
      .then(() => {
        dispatch(success(requestId));
        resolve();
      })
      .catch(() => {
        dispatch(failed('失敗'));
        reject('失敗');
      });
    });
}

export function doReturn(cid) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const requestId = Date.now();

      dispatch(lock(requestId, 'reject'));
      const isCatch = true;
      asyncXhrAuthedPost(
        '/ajax/return_item_goods.json',
        { cid }, getState(), isCatch,
      )
      .then(() => {
        dispatch(success(requestId));
        resolve();
      })
      .catch(() => {
        dispatch(failed('失敗'));
        reject('失敗');
      });
    });
}
export function doReceiveConfirm(cid) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const requestId = Date.now();

      dispatch(lock(requestId, 'reject'));
      const isCatch = true;
      asyncXhrAuthedPost(
        '/ajax/receive_confirm.json',
        { cid }, getState(), isCatch,
      )
      .then(() => {
        dispatch(success(requestId));
        resolve();
      })
      .catch(() => {
        dispatch(failed('失敗'));
        reject('失敗');
      });
    });
}
export const doCancel = cid =>
  (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const requestId = Date.now();
      dispatch(lock(requestId, 'cancel'));
      const isCatch = true;
      asyncXhrAuthedPost(
        '/ajax/cancel_order.json',
        { cid },
        getState(),
        isCatch,
      ).then(() => {
        dispatch(success(requestId));
        resolve();
      }).catch(() => {
        dispatch(failed('失敗'));
        reject();
      });
    });

export function doScore(cid, score, comment) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const requestId = Date.now();

      dispatch(lock(requestId, 'reject'));
      const isCatch = true;
      asyncXhrAuthedPost(
        '/ajax/score_order.json',
        { cid, score, comment }, getState(), isCatch,
      )
      .then(() => {
        dispatch(success(requestId));
        resolve();
      })
      .catch(() => {
        dispatch(failed('失敗'));
        reject('失敗');
      });
    });
}
export function doReject(cid) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const requestId = Date.now();

      dispatch(lock(requestId, 'reject'));
      const isCatch = true;
      asyncXhrAuthedPost(
        '/ajax/reject_order.json',
        { cid }, getState(), isCatch,
      )
      .then(() => {
        dispatch(success(requestId));
        resolve();
      })
      .catch(() => {
        dispatch(failed('失敗'));
        reject('失敗');
      });
    });
}

export function doEndOrder(type, cid) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const requestId = Date.now();

      const apiUrl = (type === 'SERVICE') ? '/ajax/end_service.json' : '/ajax/end_space.json';
      dispatch(lock(requestId, 'reject'));
      const isCatch = true;
      asyncXhrAuthedPost(
        apiUrl,
        { cid }, getState(), isCatch,
      )
      .then(() => {
        dispatch(success(requestId));
        resolve();
      })
      .catch(() => {
        dispatch(failed('失敗'));
        reject('失敗');
      });
    });
}

const createFormPost = (path, params) => {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = path;
  forEach(params, (value, key) => {
    const inputElement = document.createElement('input');
    inputElement.value = value;
    inputElement.name = key;
    inputElement.type = 'hidden';
    form.appendChild(inputElement);
  });

  document.body.appendChild(form);
  form.submit();
};

export function doCreditCardPayment(cid) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const requestId = Date.now();

      dispatch(lock(requestId, 'ccPay'));
      const isCatch = true;
      asyncXhrAuthedPost(
        '/ajax/creditcard_payment.json',
        { cid }, getState(), isCatch,
      ).then(({ redirect, ...params }) => {
        dispatch(success(requestId));
        createFormPost(redirect, params);
        resolve();
      }).catch(() => {
        dispatch(failed('失敗'));
        reject('失敗');
      });
    });
}

export function doATMPayment(cid) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const requestId = Date.now();

      dispatch(lock(requestId, 'atmPay'));
      dispatch(popupFetching());
      const isCatch = true;
      asyncXhrAuthedPost(
        '/ajax/get_paymentinfo.json',
        { cid }, getState(), isCatch,
      ).then((data) => {
        dispatch(popupFetched(data));
        dispatch(success(requestId));
        resolve();
      }).catch(() => {
        dispatch(failed('失敗'));
        reject('失敗');
      });
    });
}

export function getShipOrder(cid, type) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const requestId = Date.now();

      dispatch(lock(requestId, 'shipOrder'));
      dispatch(popupFetching());
      const isCatch = true;
      asyncXhrAuthedPost(
        '/ajax/get_ship_order.json',
        {
          cid,
          send_type: type,
        }, getState(), isCatch,
      ).then((data) => {
        if (data.orderno) {
          dispatch(popupFetched(data));
          dispatch(success(requestId));
          resolve();
        } else {
          asyncXhrAuthedPost(
            '/ajax/create_ship_order.json',
            {
              cid,
              send_type: type,
            }, getState(), isCatch,
          ).then((data2) => {
            dispatch(popupFetched(data2));
            if (type === 'OWNER_SEND') {
              dispatch(fetchedSendSeven(data2));
            } else {
              dispatch(fetchedReturnSeven(data2));
            }
            resolve();
          });
        }
      }).catch(() => {
        dispatch(failed('失敗'));
        reject('失敗');
      });
    });
}

export function getShipLog(orderNo) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const requestId = Date.now();

      dispatch(lock(requestId, 'shipLog'));
      dispatch(popupFetching());
      const isCatch = true;
      asyncXhrAuthedPost(
        '/ajax/get_ship_log.json',
        {
          order_no: orderNo,
        }, getState(), isCatch,
      ).then((data) => {
        dispatch(popupFetched({ logs: data, orderNo }));
        dispatch(success(requestId));
        resolve();
      }).catch(() => {
        dispatch(failed('失敗'));
        reject('失敗');
      });
    });
}

export function uploadImage(cidNo, type, imgs) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const requestId = Date.now();
      dispatch(lock(requestId, 'uploadImage'));
      dispatch(popupFetching());
      const isCatch = true;
      asyncXhrAuthedPost(
        '/ajax/upload_image_record.json',
        {
          cid: cidNo,
          type,
          imgs,
        }, getState(), isCatch,
      ).then(() => {
        dispatch(success(requestId));
        resolve(imgs);
      }).catch(() => {
        dispatch(failed('失敗'));
        reject('失敗');
      });
    });
}
// =============================================
// = reducer =
// =============================================

const initialState = {
  lock: false,
  curAction: '', // debug purpose
  requestId: 0,  // every api request needs a unique id
  success: false,
  isErr: false,
  errMsg: '',
  esunForm: null,
};

export default (state = initialState, action) => {
  if (action.type === FAILED) {
    // if API request is Rejcted by API, return a reason to component
    return Object.assign({}, state, {
      lock: false,
      isErr: true,
      errMsg: '正在發送請求中...請勿動作',
    });
  } else if (state.lock === true &&
    action.requestId !== 0 &&
    action.requestId !== state.requestId) {
    // reject any request if api is already in request
    return Object.assign({}, state, {
      isErr: true,
      errMsg: '正在發送請求中...請勿動作',
    });
  }

  switch (action.type) {
    case LOCK:
      // accept request and lock reducer from other request
      return Object.assign({}, state, {
        lock: true,
        isErr: false,
        success: false,
        errMsg: '',
        requestId: action.requestId,
        curAction: action.actionName,
      });
    case SUCCESSS:
      // release reducer for other request
      return Object.assign({}, state, {
        lock: false,
        success: true,
      });
    case SET_ESUN_FORM:
      return Object.assign({}, state, {
        esunForm: action.form,
      });
    case RESET:
      return initialState;
    default:
      return state;
  }
};
