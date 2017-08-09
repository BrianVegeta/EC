import { asyncXhrAuthedPost } from 'lib/xhr';


// =============================================
// = action type =
// =============================================
const prefix = action => (`USERPROFILE.${action}`);

export const FETCHING = prefix('FETCHING');
export const FETCHED = prefix('FETCHED');


// =============================================
// = actions =
// =============================================
const fetchingUser = () => ({
  type: FETCHING,
});

const fetchedUser = detail => ({
  type: FETCHED,
  detail,
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
      const { user_profile } = responseData;
      dispatch(fetchedUser(user_profile));
    });
  };
}

// export function fetchWishList(uid) {
//   return (dispatch, getState) => {
//     dispatch(fetchingWishList());
//     asyncXhrAuthedPost(
//       '/ajax/get_wish.json',
//       {
//         uid,
//         index: 0,
//         size: 3,
//       },
//       getState(),
//     )
//     .then((responseData) => {
//       dispatch(fetchedWishList(responseData));
//     });
//   };
// }


// =============================================
// = reducer =
// =============================================
const initialState = {
  isFetching: false,
  detail: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING:
      return Object.assign({}, state, {
        isFetching: true,
      });

    case FETCHED:
      return Object.assign({}, state, {
        isFetching: false,
        detail: action.detail,
      });

    default:
      return state;
  }
};
