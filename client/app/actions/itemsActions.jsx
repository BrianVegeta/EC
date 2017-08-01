/* eslint-disable import/prefer-default-export */
import { asyncXhrPost } from 'lib/xhr';
import * as types from 'constants/actionTypes/items';

const fetching = () => ({
  type: types.FETCHING,
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
  return (dispatch) => {
    dispatch(fetching());

    asyncXhrPost(
      '/ajax/item/list.json',
      {
        index: 0,
        size: 21,
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
