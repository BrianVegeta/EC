import { asyncXhrAuthedPost } from 'lib/xhr';


// =============================================
// = action type =
// =============================================
const prefix = action => (`USERPROFILE.ITEMS_GOODS.${action}`);

export const FETCHING = prefix('FETCHING');


// =============================================
// = actions =
// =============================================
const fetching = userprofile => ({
  type: FETCHING,
  userprofile,
});

// export function fetchUser(uid) {
//   return (dispatch, getState) => {
//     dispatch(fetchingUser());
//     asyncXhrAuthedPost(
//       '/ajax/user_info.json',
//       { isShowItem: false, uid },
//       getState(),
//     )
//     .then((responseData) => {
//       dispatch(fetchedUser(responseData));
//     });
//   };
// }


// =============================================
// = reducer =
// =============================================
const initialState = {
  isFetching: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING:
      return Object.assign({}, state, {
        isFetching: true,
      });

    default:
      return state;
  }
};
