/* eslint-disable import/prefer-default-export */
import { fetchGetRequest, fetchDeleteRequest } from '../lib/xhr';
import * as TYPES from '../constants/actionTypes/mine';

const itemsFetched = items => ({
  type: TYPES.ITEMS_FETCHED,
  items,
});

export const tabItemCate = itemsCateState => ({
  type: TYPES.ITEMS_TAB,
  itemsCateState,
});

const PATH_FETCH_ITEMS = '/ajax/mine/items.json';
export function fetchItems() {
  return (dispatch) => {
    const callback = (json) => {
      const { data } = json;
      const { items } = data;
      dispatch(itemsFetched(items));
    };
    fetchGetRequest(PATH_FETCH_ITEMS, callback);
  };
}

export const itemsEnterEditing = () => ({
  type: TYPES.ITEMS_EDITING,
});
export const itemsCancelEditing = () => ({
  type: TYPES.ITEMS_CANCEL_EDITING,
});
export const itemsAddToDelete = pid => ({
  type: TYPES.ITEMS_ADD_TO_DELETE,
  pid,
});
const deleteFromItems = pids => ({
  type: TYPES.ITEMS_DELETE,
  pids,
});
const PATH_DELETE_ITEMS = '/ajax/mine/items_remove.json';
export function deleteItems(pids) {
  return (dispatch) => {
    const bodyJSON = JSON.stringify({ pids });
    const callback = (json) => {
      const { success } = json;
      if (success) {
        dispatch(deleteFromItems(pids));
      }
    };
    fetchDeleteRequest(PATH_DELETE_ITEMS, bodyJSON, callback);
  };
}
