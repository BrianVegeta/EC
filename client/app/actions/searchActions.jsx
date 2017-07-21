import * as TYPES from '../constants/actionTypes';
import { fetchXhrPost } from '../lib/xhr';


export const closeResultPanel = () => ({
  type: TYPES.SEARCH_CLOSE_RESULT_PANEL,
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

export function searchByName(name) {
  return (dispatch) => {
    const index = 0;
    const size = 3;

    dispatch(beforeFetchMulti());

    fetchXhrPost(
      '/ajax/search/multi.json',
      { name, index, size },
      (response) => {
        const {
          users,
          items,
          wishs,
        } = response.data;

        dispatch(
          afterFetchMulti(
            users,
            items,
            wishs,
          ),
        );
      },
    );
  };
}

function innerSearchByName(name, path, before, after) {
  const index = 0;
  const size = 20;

  before();

  fetchXhrPost(
    path,
    { name, index, size },
    (response) => {
      after(response.data);
    },
  );
}

export function searchUserByName(name) {
  return (dispatch) => {
    innerSearchByName(
      name,
      '/ajax/search/user.json',
      () => dispatch(beforeFetchUser()),
      users => dispatch(afterFetchUser(users)),
    );
  };
}
export function searchItemByName(name) {
  return (dispatch) => {
    innerSearchByName(
      name,
      '/ajax/search/item.json',
      () => dispatch(beforeFetchItem()),
      items => dispatch(afterFetchItem(items)),
    );
  };
}
export function searchWishByName(name) {
  return (dispatch) => {
    innerSearchByName(
      name,
      '/ajax/search/wish.json',
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
