import { isEqual } from 'lodash';
import { fetchXhrPost } from 'lib/xhr';

/* =============================================>>>>>
= settings =
===============================================>>>>>*/
export const REDUCER_KEY = 'item';

/* =============================================>>>>>
= action types =
===============================================>>>>>*/

const prefix = action => (`USERPROFILE.${action}`);
const SET_EDIT = prefix('SET_EDIT');
const CHANGE_OWNER = prefix('CHANGE_OWNER');

/* =============================================>>>>>
= actions =
===============================================>>>>>*/

const setEdit = detail => ({
  type: SET_EDIT,
  detail,
});

const changeOwner = userProfile => ({
  type: CHANGE_OWNER,
  userProfile,
});


export function editItem(pid) {
  return (dispatch) => {
    fetchXhrPost(
      '/ajax/item_detail.json',
      { pid },
      (response) => {
        dispatch(setEdit(response.data));
        // <--- CHANGE OWNER ---
        fetchXhrPost(
          '/ajax/user_info.json',
          { uid: response.data.uid },
          (userResponse) => {
            dispatch(changeOwner(userResponse.data.user_profile));
          },
        );
        // ---- CHANGE OWNER --->
      },
    );
  };
}


/* =============================================>>>>>
= reducers =
===============================================>>>>>*/
const initialState = {
  ownerProfile: {},
};

export const isStateInitial = props =>
  isEqual(props, initialState);

export default function (state = initialState, action) {
  switch (action.type) {

    case SET_EDIT:
      return Object.assign({}, state, action.detail);

    case CHANGE_OWNER:
      return Object.assign({}, state, {
        ownerProfile: action.userProfile,
      });

    default:
      return state;
  }
}
