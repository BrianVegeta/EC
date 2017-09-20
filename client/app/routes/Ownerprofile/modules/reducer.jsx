import * as types from './actionTypes';

const initialState = {
  isFetchingUser: false,
  isFetchingWishList: false,
  items: [],
  wishlist: [],
  user_profile: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCHING_USER:
      return Object.assign({}, state, { isFetchingUser: true });

    case types.FETCHED_USER:
      return Object.assign({}, state, {
        isFetchingUser: false,
        user_profile: action.userprofile.user_profile,
        items: action.userprofile.items,
      });

    case types.FETCHING_WISHLIST:
      return Object.assign({}, state, { isFetchingWishList: true });

    case types.FETCHED_WISHLIST:
      return Object.assign({}, state, {
        isFetchingWishList: false,
        wishlist: action.wishlist,
      });

    default:
      return state;
  }
};
