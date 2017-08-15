import { asyncXhrAuthedPost } from 'lib/xhr';
import { forEach } from 'lodash';

/* =============================================>>>>>
= userprofile =
===============================================>>>>>*/

const ACTION_PREFIX = 'MY.ORDER';
const REDUCER_KEY = 'myOrder';

// =============================================
// = action type =
// =============================================

const prefix = action => (`${ACTION_PREFIX}.${action}`);

const FETCHED = prefix('FETCHED');
const FETCHING = prefix('FETCHING');
const RESET = prefix('RESET');


// =============================================
// = CONSTANT FOR API USAGE =
// =============================================

export const ROLE_OWNER = 'OWNER';
export const ROLE_LESSEE = 'LESSEE';
export const ROLE_BOTH = 'BOTH';

export const TYPE_ITEM = 'ITEM';
export const TYPE_SERVICE = 'SERVICE';
export const TYPE_SPACE = 'SPACE';

export const TAB_REQUEST = 'TAB_REQUEST';
export const TAB_PAY = 'TAB_PAY';
export const TAB_SHIPPING = 'TAB_SHIPPING';
export const TAB_SHIPPING_CONFIRM = 'TAB_SHIPPING_CONFIRM';
export const TAB_WAITING_TO_GO = 'TAB_WAITING_TO_GO';
export const TAB_ONGOING = 'TAB_ONGOING';
export const TAB_RETURN = 'TAB_RETURN';
export const TAB_RETURN_CONFIRM = 'TAB_RETURN_CONFIRM';
export const TAB_COMPLETE = 'TAB_COMPLETE';
export const TAB_CANCEL = 'TAB_CANCEL';
export const TAB_SUE = 'TAB_SUE';
export const TAB_SUE_COMPLETE = 'TAB_SUE_COMPLETE';
export const TAB_NULL = 'TAB_NULL';

// =============================================
// = actions =
// =============================================

const fetching = expireFlag => ({
  type: FETCHING,
  expireFlag,
});

const fetched = (records, tabName) => ({
  type: FETCHED,
  records,
  tabName,
});

export const reset = () => ({
  type: RESET,
});

function checkExpire(records, tabName, expireFlag) {
  return (dispatch, getState) => {
    if (expireFlag !== getState()[REDUCER_KEY].expireFlag) {
      return;
    }
    dispatch(fetched(records, tabName));
  };
}


export function fetchRecords(roleType, orderType, tabName) {
  return (dispatch, getState) => {
    const { auth } = getState();
    const { currentUser } = auth;
    const expireFlag = Date.now();
    dispatch(fetching(expireFlag));
    asyncXhrAuthedPost(
      '/ajax/get_my_order.json',
      {
        role_type: roleType,
        type: orderType,
        uid: currentUser.uid
      },
      getState(),
    )
    .then((responseData) => {
      dispatch(checkExpire(responseData, tabName, expireFlag));
    });
  };
}


// =============================================
// = reducer =
// =============================================

const initialState = {
  expireFlag: null,
  isFetching: false,
  records: [],
};

export default (state = initialState, action) => {
  let newRecords = [];
  switch (action.type) {
    case FETCHING:
      newRecords = [];
      return Object.assign({}, state, {
        records: [],
        isFetching: true,
        expireFlag: action.expireFlag,
      });

    case FETCHED:
      forEach(action.records, (order) => {
        if (order.display.tab === action.tabName) {
          newRecords.push(order);
        }
      });
      return Object.assign({}, state, {
        isFetching: false,
        records: newRecords,
      });

    case RESET:
      return initialState;

    default:
      return state;
  }
};
