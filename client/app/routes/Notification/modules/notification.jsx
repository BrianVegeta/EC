/* eslint-disable camelcase */
import { asyncXhrAuthedPost } from 'lib/xhr';
import { reduceDuplicateRecords } from 'lib/utils';
import { itemPath, wishRouter } from 'lib/paths';
/* =============================================>>>>>
= orderDetail =
===============================================>>>>>*/

const ACTION_PREFIX = 'NOTIFY.ACTION';
const DUPLICATE_KEY = 'id';
const REDUCER_KEY = 'notify';
const SIZE = 10;

// =============================================
// = action type =
// =============================================
const prefix = action => (`${ACTION_PREFIX}.${action}`);

const FETCHING = prefix('FETCHING');
const FETCHEDUNREAD = prefix('FETCHEDUNREAD');
const FETCHED = prefix('FETCHED');
const FETCHEDMORE = prefix('FETCHEDMORE');
const RESET = prefix('RESET');
const RESET_RECURSIVE_TIMES = prefix('RESET_RECURSIVE_TIMES');
const RECURSIVE_LIMIT = 10;

export const TYPE_CONTRACT = 1;
export const TYPE_ACTIVITY = 0;
export const TYPE_ITEM = 4;
export const TYPE_SYSTEM = 6;
export const TYPE_WISH = 7;

export const CONTENT_TYPE_NONE = 0;
export const CONTENT_TYPE_WEB = 1;
export const CONTENT_TYPE_ITEM = 2;
// =============================================
// = actions =
// =============================================
export const reset = () => ({
  type: RESET,
});

const fetching = (fetchType, expireFlag) => ({
  type: FETCHING,
  fetchType,
  expireFlag,
});


const fetchedUnread = unreadCount => ({
  type: FETCHEDUNREAD,
  unreadCount,
});

const fetched = (records, isPaginable, index, lastReadTime) => ({
  type: FETCHED,
  records,
  isPaginable,
  index,
  lastReadTime,
});

const fetchMore = records => ({
  type: FETCHEDMORE,
  records,
});

const resetRecursiveTimes = () => ({
  type: RESET_RECURSIVE_TIMES,
});

function checkExpire(records, isPaginable, index, expireFlag, lastReadTime) {
  return (dispatch, getState) => {
    if (expireFlag !== getState()[REDUCER_KEY].expireFlag) {
      return;
    }
    dispatch(fetched(records, isPaginable, index, lastReadTime));
  };
}

function checkExpireMore(records, expireFlag) {
  return (dispatch, getState) => {
    if (expireFlag !== getState()[REDUCER_KEY].expireFlag) {
      return;
    }
    dispatch(fetchMore(records));
  };
}


export function parseActivityNotify(recordData, lastReadTime) {
  const records = [];
  recordData.notifications.map(({ id, content, type, create_time }) => {
    const json = JSON.parse(content);
    const data = {
      id,
      message: json.content,
      contentType: json.type,
      type,
      url: json.url,
      createTime: create_time,
      isRead: (create_time <= lastReadTime),
    };
    records.push(data);
    return records;
  });
  return records;
}

export function parseContractNotify({ notifications }, lastReadTime) {
  if (!notifications || notifications.length === 0) return [];
  return notifications.map(({ content, id, create_time }) => {
    const json = JSON.parse(content);
    return {
      id,
      itemImage: json.item_img,
      message: json.content,
      cid: json.cid,
      createTime: create_time,
      isRead: create_time <= lastReadTime,
    };
  });
}

export function parseItemNotify({ notifications }, lastReadTime) {
  if (!notifications || notifications.length === 0) return [];
  return notifications.map(({ type, content, create_time }) => {
    const json = JSON.parse(content);
    const contentType = json.type || 0;

    let url;
    if (type === TYPE_ITEM && contentType === CONTENT_TYPE_ITEM) {
      url = itemPath('', json.pid);
    } else if (type === TYPE_WISH) {
      url = wishRouter.detailPath(json.id);
    }

    return {
      type,
      contentType,
      url,
      message: json.content,
      createTime: create_time,
      isRead: create_time <= lastReadTime,
    };
  });
}


export function fetchMoreData() {
  return (dispatch, getState) => {
    const {
      fetchType,
      index,
      records,
      recursiveTimes,
      lastReadTime,
    } = getState()[REDUCER_KEY];
    /* LOADING FETCH */
    const expireFlag = Date.now();
    dispatch(fetching(fetchType, expireFlag));
    asyncXhrAuthedPost(
      '/ajax/get_notify.json',
      {
        type: fetchType,
        index,
        size: SIZE,
      },
      getState(),
    )
    .then((recordData) => {
      let newRecord = [];
      switch (fetchType) {
        case TYPE_CONTRACT:
          newRecord = parseContractNotify(recordData, lastReadTime);
          break;
        case TYPE_ACTIVITY:
        case TYPE_SYSTEM:
          newRecord = parseActivityNotify(recordData, lastReadTime);
          break;
        case TYPE_ITEM:
          newRecord = parseItemNotify(recordData, lastReadTime);
          break;
        default:
          break;
      }
      const reducedRecords = reduceDuplicateRecords(newRecord, records, DUPLICATE_KEY);
      if (reducedRecords.length < newRecord.length && recursiveTimes <= RECURSIVE_LIMIT) {
        /* RECURSIVE AGAIN */
        dispatch(fetchMore());
        return;
      }

      /* RESET RECURSIVE FREQUENCY */
      dispatch(resetRecursiveTimes());

      dispatch(checkExpireMore(newRecord, expireFlag));
    });
  };
}

export function fetchUnreadCount(type) {
  return (dispatch, getState) => {
    const expireFlag = Date.now();
    /* LOADING FETCH */
    dispatch(fetching(type, expireFlag));
    asyncXhrAuthedPost(
      '/ajax/count_unread_notify.json',
      { },
      getState(),
    )
    .then((responseData) => {
      const newUnread = {
        CONTRACT: responseData.contract_unread_count,
        ITEM: responseData.instant_info_unread_count,
        ACTIVITY: responseData.marketing_unread_count,
        SYSTEM: responseData.system_unread_count,
      };
      dispatch(fetchedUnread(newUnread));
      let index = 0;
      let size = SIZE;
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
        case TYPE_ITEM:
          size = (size < responseData.instant_info_unread_count) ?
            responseData.instant_info_unread_count : size;
          break;
        default:
          break;
      }
      size += ((size % 10) + 1);
      asyncXhrAuthedPost(
        '/ajax/get_notify.json',
        { type, index, size },
        getState(),
      )
      .then((recordData) => {
        let records = [];
        const lastReadTime = recordData.last_read_time;
        switch (type) {
          case TYPE_CONTRACT:
            records = parseContractNotify(recordData, lastReadTime);
            break;
          case TYPE_ACTIVITY:
          case TYPE_SYSTEM:
            records = parseActivityNotify(recordData, lastReadTime);
            break;
          case TYPE_ITEM:
            records = parseItemNotify(recordData, lastReadTime);
            break;
          default:
            break;
        }

        const isPaginable = (records.length === size);
        index = isPaginable ? (size - 1) : size;
        if (isPaginable) {
          records.pop();
        }
        dispatch(checkExpire(records, isPaginable, index, expireFlag, lastReadTime));
      });
    });
  };
}

// =============================================
// = reducer =
// =============================================
const initialState = {
  expireFlag: null,
  isPaginable: true,
  isFetching: false,
  unreadCount: {
    CONTRACT: 0,
    ACTIVITY: 0,
    SYSTEM: 0,
    ITEM: 0,
  },
  size: SIZE,
  records: [],
  fetchType: 0,
  index: 0,
  lastReadTime: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING:
      return Object.assign({}, state, {
        expireFlag: action.expireFlag,
        fetchType: action.fetchType,
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
        isPaginable: action.isPaginable,
        index: action.index,
        lastReadTime: action.lastReadTime,
      });

    case FETCHEDMORE:
      return Object.assign({}, state, {
        isFetching: false,
        isPaginable: ((action.records.length % state.size) === 0),
        records: state.records.concat(action.records),
        index: state.index + action.records.length,
      });

    case RESET_RECURSIVE_TIMES:
      return Object.assign({}, state, {
        recursiveTimes: 0,
      });

    case RESET:
      return initialState;

    default:
      return state;
  }
};
