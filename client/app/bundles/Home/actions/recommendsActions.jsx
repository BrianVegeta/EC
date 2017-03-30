/* eslint-disable import/prefer-default-export */
import * as TYPES from '../constants/actionTypes';

const receiveItems = (items, category) => ({
  type: TYPES.RECOMMENDS_RECEIVED,
  items,
  category,
});

const fetchingItems = category => ({
  type: TYPES.RECOMMENDS_FETCHING,
  category,
});

export function fetchRecommends(category) {
  return (dispatch, getState) => {
    dispatch(fetchingItems(category));

    const { routes } = getState();
    fetch(routes.ajaxRecommendItems.replace(':category', category), {
      credentials: 'same-origin',
      method: 'GET',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(items => dispatch(receiveItems(items, category)))
    .catch((err) => { throw err; });
  };
}
