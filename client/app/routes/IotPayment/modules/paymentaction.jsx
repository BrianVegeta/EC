import { forEach } from 'lodash';
import { asyncXhrAuthedPost } from 'lib/xhr';

/* =============================================>>>>>
= userprofile =
===============================================>>>>>*/

const ACTION_PREFIX = 'IOT.PAYMENT.ACTION';
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
