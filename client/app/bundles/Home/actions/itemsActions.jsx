/* eslint-disable import/prefer-default-export */
import * as TYPES from '../constants/actionTypes';

const fetchingItems = () => ({
  type: TYPES.ITEMS_FETCHING,
});

const fetchedItems = items => ({
  type: TYPES.ITEMS_FETCHED,
  items,
});

const fetchingCategories = () => ({
  type: TYPES.ITEMS_CATEGORIES_FETCHING,
});

const fetchedCategories = categories => ({
  type: TYPES.ITEMS_CATEGORIES_FETCHED,
  categories,
});

export function fetchItems() {
  return (dispatch, getState) => {
    dispatch(fetchingItems());

    const { routesHelper } = getState();
    fetch(routesHelper.ajax.items, {
      credentials: 'same-origin',
      method: 'GET',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then((items) => {
      dispatch(fetchedItems(items));
    })
    .catch((err) => { throw err; });
  };
}

export function fetchCategories() {
  return (dispatch, getState) => {
    dispatch(fetchingCategories());

    const { routesHelper } = getState();
    fetch(routesHelper.ajax.categories, {
      credentials: 'same-origin',
      method: 'GET',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(categories => dispatch(fetchedCategories(categories)))
    .catch((err) => { throw err; });
  };
}
