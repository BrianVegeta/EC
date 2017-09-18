import { reduceDuplicateRecords } from 'lib/utils';
import * as TYPES from '../constants/actionTypes';
import { asyncXhrPost } from '../lib/xhr';

const REDUCER_KEY = 'search';
export const SEARCH_SIZE = 20;
const RECURSIVE_LIMIT = 10;

export const closeResultPanel = () => ({
  type: TYPES.SEARCH_CLOSE_RESULT_PANEL,
});

const beforeFetchUser = (isMore, expireFlag) => ({
  type: TYPES.SEARCH_BEFORE_FETCH_USER,
  isMore,
  expireFlag,
});
const beforeFetchItem = (isMore, expireFlag) => ({
  type: TYPES.SEARCH_BEFORE_FETCH_ITEM,
  isMore,
  expireFlag,
});
const beforeFetchWish = (isMore, expireFlag) => ({
  type: TYPES.SEARCH_BEFORE_FETCH_WISH,
  isMore,
  expireFlag,
});
const beforeFetchMulti = expireFlag => ({
  type: TYPES.SEARCH_BEFORE_FETCH_MULTI,
  expireFlag,
});
const afterFetchUser = (users, isMore: false) => ({
  type: TYPES.SEARCH_AFTER_FETCH_USER,
  users,
  isMore,
});
const afterFetchItem = (items, isMore: false) => ({
  type: TYPES.SEARCH_AFTER_FETCH_ITEM,
  items,
  isMore,
});
const afterFetchWish = (wishs, isMore: false) => ({
  type: TYPES.SEARCH_AFTER_FETCH_WISH,
  wishs,
  isMore,
});
const afterFetchMulti = (users, items, wishs) => ({
  type: TYPES.SEARCH_AFTER_FETCH_MULTI,
  users,
  items,
  wishs,
});
const doneFetchUser = () => ({
  type: TYPES.SEARCH_DONE_FETCH_USER,
});
const doneFetchItem = () => ({
  type: TYPES.SEARCH_DONE_FETCH_ITEM,
});
const doneFetchWish = () => ({
  type: TYPES.SEARCH_DONE_FETCH_WISH,
});
const countRecursiveTimes = () => ({
  type: TYPES.SEARCH_COUNT_RECURSIVE_TIMES,
});

export function searchByName(name) {
  return (dispatch, getState) => {
    const index = 0;
    const size = 3;
    const expireFlag = Date.now();
    dispatch(beforeFetchMulti(expireFlag));
    asyncXhrPost(
      '/ajax/multi.json',
      { name, index, size },
    ).then((data) => {
      const { users, items, wishs } = data;
      if (expireFlag === getState()[REDUCER_KEY].expireFlag) {
        dispatch(afterFetchMulti(users, items, wishs));
      }
    });
  };
}

// function innerSearchByName(name, path, before, after) {
//   const index = 0;
//   const size = SEARCH_SIZE;
//
//   before();
//
//   fetchXhrPost(
//     path,
//     { name, index, size },
//     (response) => {
//       after(response.data);
//     },
//   );
// }

export function searchUserByName(name, isMore: false, recursiveRecords = []) {
  return (dispatch, getState) => {
    const expireFlag = Date.now();
    dispatch(beforeFetchUser((isMore), expireFlag));
    dispatch(countRecursiveTimes());
    const {
      users,
      recursiveTimes,
    } = getState()[REDUCER_KEY];
    const tIndex = (isMore) ? getState()[REDUCER_KEY].index : 0;

    const requestParams = {
      name,
      index: tIndex + recursiveRecords.length,
      size: (SEARCH_SIZE - recursiveRecords.length),
    }
    asyncXhrPost(
      '/ajax/search_user.json',
      requestParams,
    ).then((data) => {
      const reducedRecords = reduceDuplicateRecords(data, users, 'uid');
      if (reducedRecords.length < data.length && recursiveTimes <= RECURSIVE_LIMIT) {
        /* RECURSIVE AGAIN */
        dispatch(searchUserByName(name, true, reducedRecords));
        return;
      }

      // dispatch(afterFetchUser(data.concat(recursiveRecords), isMore));
      if (expireFlag === getState()[REDUCER_KEY].expireFlag) {
        dispatch(afterFetchUser(data.concat(recursiveRecords), isMore));
      }
      dispatch(doneFetchUser());
    });
  };
}

export function searchItemByName(name, isMore: false, recursiveRecords = []) {
  return (dispatch, getState) => {

    const expireFlag = Date.now();
    dispatch(beforeFetchItem((isMore), expireFlag));
    dispatch(countRecursiveTimes());

    const {
      items,
      recursiveTimes,
    } = getState()[REDUCER_KEY];

    const tIndex = (isMore) ? getState()[REDUCER_KEY].index : 0;

    const requestParams = {
      name,
      index: tIndex + recursiveRecords.length,
      size: (SEARCH_SIZE - recursiveRecords.length),
    }
    asyncXhrPost(
      '/ajax/search_item.json',
      requestParams,
    ).then((data) => {
      const reducedRecords = reduceDuplicateRecords(data, items, 'pid');

      if (reducedRecords.length < data.length && recursiveTimes <= RECURSIVE_LIMIT) {
        /* RECURSIVE AGAIN */
        dispatch(searchItemByName(name, true, reducedRecords));
        return;
      }
      // dispatch(afterFetchItem(data.concat(recursiveRecords), isMore));
      if (expireFlag === getState()[REDUCER_KEY].expireFlag) {
        dispatch(afterFetchItem(data.concat(recursiveRecords), isMore));
      }
      dispatch(doneFetchItem());
    });
  };
}
export function searchWishByName(name, isMore: false, recursiveRecords = []) {
  return (dispatch, getState) => {

    const expireFlag = Date.now();
    dispatch(beforeFetchWish((isMore), expireFlag));
    dispatch(countRecursiveTimes());

    const {
      wishs,
      recursiveTimes,
    } = getState()[REDUCER_KEY];

    const tIndex = (isMore) ? getState()[REDUCER_KEY].index : 0;
    const requestParams = {
      name,
      last_id: 0,
      index: tIndex + recursiveRecords.length,
      size: (SEARCH_SIZE - recursiveRecords.length),
    };
    asyncXhrPost(
      '/ajax/serach_wish.json',
      requestParams,
    ).then((data) => {
      const reducedRecords = reduceDuplicateRecords(data, wishs, 'id');
      if (reducedRecords.length < data.length && recursiveTimes <= RECURSIVE_LIMIT) {
        /* RECURSIVE AGAIN */
        dispatch(searchWishByName(name, true, reducedRecords));
        return;
      }
      // dispatch(afterFetchWish(data.concat(recursiveRecords), isMore));
      if (expireFlag === getState()[REDUCER_KEY].expireFlag) {
        dispatch(afterFetchWish(data.concat(recursiveRecords), isMore));
      }

      dispatch(doneFetchWish());
    });
  };
}


export const clearMulti = () => ({
  type: TYPES.SEARCH_CLEAR_MULTI_RESULTS,
});

export const updateQuery = query => ({
  type: TYPES.SEARCH_UPDATE_QUERY,
  query,
});

export const setInputRect = ({ top, left, right, bottom, height, width }) => ({
  type: TYPES.SEARCH_SET_INPUT_RECT,
  top,
  left,
  right,
  bottom,
  height,
  width,
});
