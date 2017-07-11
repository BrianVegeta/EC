/* eslint-disable import/prefer-default-export */
import { fetchXhrGet, fetchXhrPost } from '../lib/xhr';
import * as TYPES from '../constants/actionTypes/item';


const setEdit = detail => ({
  type: TYPES.SET_EDIT,
  detail,
});

const changeOwner = userProfile => ({
  type: TYPES.CHANGE_OWNER,
  userProfile,
});

export function editItem(pid) {
  return (dispatch) => {
    fetchXhrGet(
      `/ajax/items/${pid}/edit.json`,
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
