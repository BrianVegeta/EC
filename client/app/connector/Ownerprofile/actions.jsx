/* eslint-disable import/prefer-default-export */
import { asyncXhrAuthedPost } from 'lib/xhr';
import * as types from './actionTypes';

const fetchedUser = userprofile => ({
  type: types.FETCHED_USER,
  userprofile,
});

const fetchingUser = () => ({
  type: types.FETCHING_USER,
});

const fetchedWishList = wishlist => ({
  type: types.FETCHED_WISHLIST,
  wishlist,
});

const fetchingWishList = () => ({
  type: types.FETCHING_WISHLIST,
});

export function fetchUser(uid) {
  console.log('call api');
  return (dispatch, getState) => {
    dispatch(fetchingUser());
    asyncXhrAuthedPost(
      '/ajax/user_info.json',
      { isShowItem: true, uid },
      getState(),
    )
    .then((responseData) => {
      dispatch(fetchedUser(responseData));
    });
  };
}

export function fetchWishList(uid) {
  console.log('call api');
  return (dispatch, getState) => {
    dispatch(fetchingWishList());
    asyncXhrAuthedPost(
      '/ajax/get_wish.json',
      {
        uid,
        index: 0,
        size: 3,
      },
      getState(),
    )
    .then((responseData) => {
      dispatch(fetchedWishList(responseData));
    });
  };
}
