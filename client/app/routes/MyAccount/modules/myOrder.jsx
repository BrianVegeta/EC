import { asyncXhrAuthedPost } from 'lib/xhr';
import { forEach, has } from 'lodash';

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
const FETCHED_UNREAD = prefix('FETCHED_UNDREAD');
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
export const TYPE_USED_ITEM = 'USED_ITEM';

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

const fetched = (records, roleType, tabName) => ({
  type: FETCHED,
  records,
  roleType,
  tabName,
});

const fetchedUnread = unreadCount => ({
  type: FETCHED_UNREAD,
  unreadCount,
});

export const reset = () => ({
  type: RESET,
});

function checkExpire(records, roleType, tabName, expireFlag) {
  return (dispatch, getState) => {
    if (expireFlag !== getState()[REDUCER_KEY].expireFlag) {
      return;
    }
    dispatch(fetched(records, roleType, tabName));
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
        uid: currentUser.uid,
      },
      getState(),
    )
    .then((responseData) => {
      dispatch(checkExpire(responseData, roleType, tabName, expireFlag));
    });
  };
}

export const checkUnreadCount = ({ isOwnerPage }) => (dispatch, getState) => {
  const path = '/ajax/get_my_unread_count.json';
  asyncXhrAuthedPost(
    path,
    {},
    getState(),
  )
  .then((responseData) => {
    if (isOwnerPage) {
      dispatch(fetchedUnread({
        item: responseData.owner_item_unread_count,
        service: responseData.owner_service_unread_count,
        space: responseData.owner_space_unread_count,
        used_item: responseData.owner_used_item_unread_count,
      }));
    } else {
      dispatch(fetchedUnread({
        item: responseData.lessee_item_unread_count,
        service: responseData.lessee_service_unread_count,
        space: responseData.lessee_space_unread_count,
        used_item: responseData.lessee_used_item_unread_count,
      }));
    }
  });
};

// =============================================
// = reducer =
// =============================================

const initialState = {
  expireFlag: null,
  isFetching: false,
  records: [],
  unreads: {},
  unreadCount: {
    item: 0,
    service: 0,
    space: 0,
    used_item: 0,
  },
};

export default (state = initialState, action) => {
  let newRecords = [];
  let newUnreads = {};
  let targetTabName = '';
  switch (action.type) {
    case FETCHING:
      newRecords = [];
      return Object.assign({}, state, {
        records: [],
        unreads: {},
        isFetching: true,
        expireFlag: action.expireFlag,
      });

    case FETCHED:
      newUnreads = state.unreads;
      forEach(action.records, (order) => {
        targetTabName = order.display.tab;
        if (targetTabName === action.tabName) {
          newRecords.push(order);
        }
        if (has(newUnreads, targetTabName)) {
          if (action.roleType === ROLE_OWNER) {
            newUnreads[targetTabName] += (order.owner_read ? 0 : 1);
          } else if (action.roleType === ROLE_LESSEE) {
            newUnreads[targetTabName] += (order.lessee_read ? 0 : 1);
          } else {
            newUnreads[targetTabName] += (order.owner_read ? 0 : 1);
            newUnreads[targetTabName] += (order.lessee_read ? 0 : 1);
          }
        } else if (action.roleType === ROLE_OWNER) {
          newUnreads[targetTabName] = (order.owner_read ? 0 : 1);
        } else if (action.roleType === ROLE_LESSEE) {
          newUnreads[targetTabName] = (order.lessee_read ? 0 : 1);
        } else {
          newUnreads[targetTabName] = (order.owner_read ? 0 : 1);
          newUnreads[targetTabName] = (order.lessee_read ? 0 : 1);
        }
      });
      return Object.assign({}, state, {
        isFetching: false,
        records: newRecords,
        unreads: newUnreads,
      });

    case FETCHED_UNREAD:
      return Object.assign({}, state, {
        unreadCount: action.unreadCount,
      });

    case RESET:
      return initialState;

    default:
      return state;
  }
};
