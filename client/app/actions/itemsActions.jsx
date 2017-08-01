/* eslint-disable import/prefer-default-export */
import { asyncXhrPost } from 'lib/xhr';
import * as types from 'constants/actionTypes/items';

const fetching = categoryID => ({
  type: types.FETCHING,
  categoryID,
});

const fetched = (items, categoryID) => ({
  type: types.FETCHED,
  categoryID,
  items,
});

/**
 *
 * @index
 * @size
 *
 */
export function fetchItems(categoryID) {
  return (dispatch, getState) => {
    const { items: { size, index } } = getState();

    dispatch(fetching(categoryID));
    asyncXhrPost(
      '/ajax/item/list.json',
      {
        index,
        size,
        category_id: categoryID,
        sort: {
          column: 'time',
          type: 'desc',
        },
      },
    )
    .then(data =>
      dispatch(
        fetched(data, categoryID),
      ),
    );
  };
}
