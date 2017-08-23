import * as TYPES from '../constants/actionTypes';
import { fetchXhrPost, asyncXhrAuthedPost } from '../lib/xhr';


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
      '/ajax/multi.json',
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
  return (dispatch, getState) => {
    dispatch(beforeFetchUser());
    asyncXhrAuthedPost(
      '/ajax/search_user.json',
      {
        name,
        index: 0,
        size: 20,
      },
      getState(),
    ).then((responseData) => {
      dispatch(afterFetchUser(responseData))
    });
  };
}
export function searchItemByName(name) {
  return (dispatch, getState) => {
    dispatch(beforeFetchItem());
    asyncXhrAuthedPost(
      '/ajax/search_item.json',
      {
        name,
        index: 0,
        size: 20,
      },
      getState(),
    ).then((responseData) => {
      dispatch(afterFetchItem(responseData))
    });

    // innerSearchByName(
    //   name,
    //   '/ajax/search/item.json',
    //   () => dispatch(beforeFetchItem()),
    //   items => dispatch(afterFetchItem(items)),
    // );
  };
}
export function searchWishByName(name) {
  return (dispatch, getState) => {
    dispatch(beforeFetchWish());
    asyncXhrAuthedPost(
      '/ajax/serach_wish.json',
      {
        name,
        last_id: 0,
        index: 0,
        size: 20,
      },
      getState(),
    ).then((responseData) => {
      dispatch(afterFetchWish(responseData))
    });
    // innerSearchByName(
    //   name,
    //   '/ajax/search/wish.json',
    //   () => dispatch(beforeFetchWish()),
    //   wishs => dispatch(afterFetchWish(wishs)),
    // );
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
