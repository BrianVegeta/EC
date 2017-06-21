import _ from 'lodash';
import * as TYPES from '../constants/actionTypes';
import { fetchPostRequest } from '../lib/xhr';

const updateUsers = users => ({
  type: TYPES.SEARCH_UPDATE_USERS,
  users,
});
const updateItems = items => ({
  type: TYPES.SEARCH_UPDATE_ITEMS,
  items,
});
const updateWishs = wishs => ({
  type: TYPES.SEARCH_UPDATE_WISHS,
  wishs,
});

const beforeFetchUser = () => ({
  type: TYPES.SEARCH_BEFORE_FETCH_USER,
});
const beforeFetchItem = () => ({
  type: TYPES.SEARCH_BEFORE_FETCH_ITEM,
});
const beforeFetchWish = () => ({
  type: TYPES.SEARCH_BEFORE_FETCH_WISH,
});
const beforeFetchMulti = () => ({
  type: TYPES.SEARCH_BEFORE_FETCH_MULTI,
});

const afterFetchUser = users => ({
  type: TYPES.SEARCH_AFTER_FETCH_USER,
  users,
});
const afterFetchItem = items => ({
  type: TYPES.SEARCH_AFTER_FETCH_ITEM,
  items,
});
const afterFetchWish = wishs => ({
  type: TYPES.SEARCH_AFTER_FETCH_WISH,
  wishs,
});
const afterFetchMulti = (users, items, wishs) => ({
  type: TYPES.SEARCH_AFTER_FETCH_MULTI,
  users,
  items,
  wishs,
});

const SEARCH_USERS_PATH = '/ajax/search/user.json';
const SEARCH_ITEMS_PATH = '/ajax/search/item.json';
const SEARCH_WISHS_PATH = '/ajax/search/wish.json';
const SEARCH_MULTI_PATH = '/ajax/search/multi.json';
export function searchByName(name) {
  return (dispatch) => {
    const index = 0;
    const size = 3;
    const bodyJSON = JSON.stringify({ name, index, size });
    const callback = (response) => {
      const { data } = response;
      const { users, items, wishs } = data;
      dispatch(afterFetchMulti(users, items, wishs));
    };
    dispatch(beforeFetchMulti());
    fetchPostRequest(SEARCH_MULTI_PATH, bodyJSON, callback);
  };
}

function innerSearchByName(name, path, before, after) {
  const index = 0;
  const size = 20;
  const bodyJSON = JSON.stringify({ name, index, size });
  const callback = (response) => {
    const { data } = response;
    after(data);
  };
  before();
  fetchPostRequest(path, bodyJSON, callback);
}
export function searchUserByName(name) {
  return (dispatch) => {
    innerSearchByName(
      name,
      SEARCH_USERS_PATH,
      () => dispatch(beforeFetchUser()),
      users => dispatch(afterFetchUser(users)),
    );
  };
}
export function searchItemByName(name) {
  return (dispatch) => {
    innerSearchByName(
      name,
      SEARCH_ITEMS_PATH,
      () => dispatch(beforeFetchItem()),
      items => dispatch(afterFetchItem(items)),
    );
  };
}
export function searchWishByName(name) {
  return (dispatch) => {
    innerSearchByName(
      name,
      SEARCH_WISHS_PATH,
      () => dispatch(beforeFetchWish()),
      wishs => dispatch(afterFetchWish(wishs)),
    );
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
