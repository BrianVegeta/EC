/* eslint-disable import/prefer-default-export */
import { fetchGetRequest } from '../lib/xhr';
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
