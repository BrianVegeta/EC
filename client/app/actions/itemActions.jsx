/* eslint-disable import/prefer-default-export */
import { fetchXhrGet } from '../lib/xhr';
import * as TYPES from '../constants/actionTypes/item';


const setEdit = detail => ({
  type: TYPES.SET_EDIT,
  detail,
});
export function editItem(pid) {
  return (dispatch) => {
    fetchXhrGet(
      `/ajax/items/${pid}/edit.json`,
      (response) => {
        dispatch(setEdit(response.data));
      },
      (response) => {
        console.log(response);
      },
    );
  };
}
