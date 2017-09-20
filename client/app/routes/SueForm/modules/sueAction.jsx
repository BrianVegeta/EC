import { asyncXhrAuthedPost } from 'lib/xhr';

/* =============================================>>>>>
= userprofile =
===============================================>>>>>*/

const ACTION_PREFIX = 'SUE.ACTION';

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

export function sendSueReport(cid, pid, imgData, targetstage, reason, targetuid, type) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const { auth } = getState();
      const { currentUser } = auth;
      const requestId = Date.now();
      const img1 = (imgData.length > 0) ? imgData[0] : null;
      const img2 = (imgData.length > 1) ? imgData[1] : null;
      const img3 = (imgData.length > 2) ? imgData[2] : null;
      dispatch(lock(requestId, 'accept'));
      const isCatch = true;
      asyncXhrAuthedPost(
        '/ajax/send_sue_request.json',
        { cid,
          pid,
          img1,
          img2,
          img3,
          targetstage,
          reason,
          targetuid,
          type,
          uid: currentUser.uid,
        }, getState(), isCatch,
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
