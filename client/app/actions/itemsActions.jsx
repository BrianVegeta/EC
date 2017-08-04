/* eslint-disable import/prefer-default-export */
import { asyncXhrPost } from 'lib/xhr';
import * as types from 'constants/actionTypes/items';
import {
  map,
  filter,
} from 'lodash';

export const reset = () => ({
    type: types.RESET
});

const fetching = categoryID => ({
  type: types.FETCHING,
  categoryID,
});

const fetched = (items, categoryID) => ({
  type: types.FETCHED,
  categoryID,
  items,
});

const reduceDuplicate = (items, stateItems) => {
  const mappedStateItems = map(stateItems, item => item.pid);
  return filter(items, item => !mappedStateItems.includes(item.pid));
};

/* RECURSIVE  */
const PAGING_RECURSIVE_FREQUENCY_LIMIT = 10;
/* 增加 RECURSIVE 次數 */
const increasePagingRecursiveFrequency = () => ({
  type: types.INCREASE_PAGING_RECURSIVE_FREQUENCY,
});
/* 重置 RECURSIVE 次數 */
const resetPagingRecursiveFrequency = () => ({
  type: types.RESET_PAGING_RECURSIVE_FREQUENCY,
});
/**
 *
 * @index
 * @size
 *
 * recursive pagin items
 */
export function fetchItems(categoryID, recursiveRecords = []) {
  return (dispatch, getState) => {
    const { items: {
      size,
      index,
      records,
      pagingRecursiveFrequency,
    } } = getState();

    /* 增加 RECURSIVE 次數 */
    dispatch(
      increasePagingRecursiveFrequency(),
    );
    /* LOADING FETCH */
    dispatch(
      fetching(categoryID),
    );
    /* API REQUEST */
    asyncXhrPost(
      '/ajax/item/list.json',
      {
        index: (index + recursiveRecords.length),
        size: (size - recursiveRecords.length),
        category_id: categoryID,
        sort: {
          column: 'time',
          type: 'desc',
        },
      },
    )
    .then((data) => {
      const reducedRecords = reduceDuplicate(data, records);
      if (
        reducedRecords.length < data.length &&
        pagingRecursiveFrequency <= PAGING_RECURSIVE_FREQUENCY_LIMIT
      ) {
        /* RECURSIVE AGAIN */
        dispatch(
          fetchItems(categoryID, reducedRecords),
        );
      } else {
        /* RESET RECURSIVE FREQUENCY */
        dispatch(
          resetPagingRecursiveFrequency(),
        );
        /* CHANGE RECORDS IN REDUCER */
        dispatch(
          fetched(data.concat(recursiveRecords), categoryID),
        );
      }
    });
  };
}
