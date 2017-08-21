import { asyncXhrAuthedPost } from 'lib/xhr';

/* =============================================>>>>>
= orderDetail =
===============================================>>>>>*/

const ACTION_PREFIX = 'NOTIFY.ACTION';

// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);

const FETCHING = prefix('FETCHING');
const FETCHEDUNREAD = prefix('FETCHEDUNREAD');
const FETCHED = prefix('FETCHED');
const RESET = prefix('RESET');

export const TYPE_CONTRACT = 1;
export const TYPE_ACTIVITY = 0;
export const TYPE_SYSTEM = 6;
// =============================================
// = actions =
// =============================================
const fetching = () => ({
  type: FETCHING,
});

const fetchedUnread = unreadCount => ({
  type: FETCHEDUNREAD,
  unreadCount,
});
const fetched = records => ({
  type: FETCHED,
  records,
});

export const reset = () => ({
  type: RESET,
});

export function fetchUnreadCount(type) {
  return (dispatch, getState) => {
    dispatch(fetching());
    asyncXhrAuthedPost(
      '/ajax/count_unread_notify.json',
      { },
      getState(),
    )
    .then((responseData) => {
      const newUnread = {
        CONTRACT: responseData.contract_unread_count,
        ACTIVITY: responseData.marketing_unread_count,
        SYSTEM: responseData.system_unread_count,
      }
      dispatch(fetchedUnread(newUnread));
      const index = 0;
      let size = 10;
      switch (type) {
        case TYPE_ACTIVITY:
          size = (size < responseData.marketing_unread_count) ?
            responseData.marketing_unread_count : size;
          break;
        case TYPE_CONTRACT:
          size = (size < responseData.contract_unread_count) ?
            responseData.contract_unread_count : size;
          break;
        case TYPE_SYSTEM:
          size = (size < responseData.system_unread_count) ?
            responseData.system_unread_count : size;
          break;
        default:
          break;
      }
      size += (size % 10);
      asyncXhrAuthedPost(
        '/ajax/get_notify.json',
        { type, index, size },
        getState(),
      )
      .then((recordData) => {
        const records = [];
        recordData.notifications.map((val) => {
          const json = JSON.parse(val.content);
          const data = {
            id: val.id,
            message: json.content,
            cid: json.cid,
            createTime: val.create_time,
          }
          records.push(data);
          return records;
        });
        dispatch(fetched(records));
      });
    });
  };
}

// =============================================
// = reducer =
// =============================================
const initialState = {
  isFetching: false,
  unreadCount: {
    CONTRACT: 0,
    ACTIVITY: 0,
    SYSTEM: 0,
  },
  records: [],
};

export default (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    case FETCHING:
      return Object.assign({}, state, {
        isFetching: true,
      });

    case FETCHEDUNREAD:
      return Object.assign({}, state, {
        unreadCount: action.unreadCount,
      });
    case FETCHED:
      return Object.assign({}, state, {
        isFetching: false,
        records: action.records,
      });
    case RESET:
      return initialState;

    default:
      return state;
  }
};
