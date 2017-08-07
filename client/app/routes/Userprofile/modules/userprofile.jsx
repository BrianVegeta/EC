import { asyncXhrAuthedPost } from 'lib/xhr';


// =============================================
// = action type =
// =============================================
const prefix = action => (`USERPROFILE.${action}`);

export const FETCHED_USER = prefix('FETCHED_USER');
export const FETCHING_USER = prefix('FETCHING_USER');
export const FETCHED_WISHLIST = prefix('FETCHED_WISHLIST');
export const FETCHING_WISHLIST = prefix('FETCHING_WISHLIST');


// =============================================
// = actions =
// =============================================
const fetchedUser = userprofile => ({
  type: FETCHED_USER,
  userprofile,
});

const fetchingUser = () => ({
  type: FETCHING_USER,
});

const fetchedWishList = wishlist => ({
  type: FETCHED_WISHLIST,
  wishlist,
});

const fetchingWishList = () => ({
  type: FETCHING_WISHLIST,
});

export function fetchUser(uid) {
  return (dispatch, getState) => {
    dispatch(fetchingUser());
    asyncXhrAuthedPost(
      '/ajax/user_info.json',
      { isShowItem: false, uid },
      getState(),
    )
    .then((responseData) => {
      dispatch(fetchedUser(responseData));
    });
  };
}

export function fetchWishList(uid) {
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


// =============================================
// = reducer =
// =============================================
const initialState = {
  isFetchingUser: false,
  isFetchingWishList: false,
  items: [],
  wishlist: [],
  goodsItems: [],
  serviceItems: [],
  spaceItems: [],
  ownerComments: [],
  lesseeComments: [],
  user_profile: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_USER:
      return Object.assign({}, state, {
        isFetchingUser: true,
      });

    case FETCHED_USER:
      return Object.assign({}, state, {
        isFetchingUser: false,
        user_profile: action.userprofile.user_profile,
        items: action.userprofile.items,
      });

    case FETCHING_WISHLIST:
      return Object.assign({}, state, {
        isFetchingWishList: true,
      });

    case FETCHED_WISHLIST:
      return Object.assign({}, state, {
        isFetchingWishList: false,
        wishlist: action.wishlist,
      });

    default:
      return state;
  }
};
