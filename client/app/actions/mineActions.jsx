/* eslint-disable import/prefer-default-export */
import { fetchXhrAuthedGet, fetchXhrDelete } from '../lib/xhr';
import * as TYPES from '../constants/actionTypes/mine';

const itemsFetched = items => ({
  type: TYPES.ITEMS_FETCHED,
  items,
});

export const tabItemCate = itemsCateState => ({
  type: TYPES.ITEMS_TAB,
  itemsCateState,
});

export function fetchItems() {
  return (dispatch, getState) => {
    fetchXhrAuthedGet(
      '/ajax/mine/items.json',
      getState(),
      (response) => {
        dispatch(itemsFetched(response.data.items));
      },
    );
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

export function deleteItems(pids) {
  return (dispatch) => {
    fetchXhrDelete(
      '/ajax/mine/items_remove.json',
      { pids },
      () => {
        dispatch(deleteFromItems(pids));
      },
    );
  };
}
