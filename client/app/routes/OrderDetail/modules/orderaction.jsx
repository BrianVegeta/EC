import { asyncXhrAuthedPost } from 'lib/xhr';
import { forEach } from 'lodash';

/* =============================================>>>>>
= userprofile =
===============================================>>>>>*/

const ACTION_PREFIX = 'ORDER.ACTION';
const REDUCER_KEY = 'orderaction';

// =============================================
// = action type =
// =============================================

const prefix = action => (`${ACTION_PREFIX}.${action}`);

const LOCK = prefix('LOCK');
const SUCCESSS = prefix('REJECT');
const FAILED = prefix('FAILED');
const RESET = prefix('RESET');
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

export const resetAction = () => ({
  type: RESET,
});

export function doAccept(cid) {
  return (dispatch, getState) => {
    const requestId = Date.now();
    dispatch(lock(requestId, 'accept'));
    const isCatch = true;
    asyncXhrAuthedPost(
      '/ajax/accept_order.json',
      {
        cid,
      },
      getState(),
      isCatch,
    )
    .then(() => {
      dispatch(success(requestId));
    })
    .catch((error) => {
      dispatch(failed('失敗'));
      reject('失敗');
    });
  }
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
      .catch((error) => {
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
      .catch((error) => {
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
      .catch((error) => {
        dispatch(failed('失敗'));
        reject('失敗');
      });
    });
}
export function doCancel(cid) {
  return (dispatch, getState) => {
    const requestId = Date.now();
    dispatch(lock(requestId, 'cancel'));
    const isCatch = true;
    asyncXhrAuthedPost(
      '/ajax/cancel_order.json',
      {
        cid,
      },
      getState(),
      isCatch,
    )
    .then(() => {
      dispatch(success(requestId));
    })
    .catch((error) => {
      dispatch(failed('失敗'));
      reject('失敗');
    });
  }
}
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
      .catch((error) => {
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
      .catch((error) => {
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
    case RESET:
      return initialState;
    default:
      return state;
  }
};
