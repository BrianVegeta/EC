/* eslint-disable import/prefer-default-export */
import * as TYPES from '../constants/actionTypes';

const receiveItems = (items, category, bannerUrl) => ({
  type: TYPES.RECOMMENDS_RECEIVED,
  items,
  category,
  bannerUrl,
});

const fetchingItems = category => ({
  type: TYPES.RECOMMENDS_FETCHING,
  category,
});

export function fetchRecommends(category) {
  return (dispatch, getState) => {
    dispatch(fetchingItems(category));

    const { routesHelper } = getState();
    fetch(routesHelper.ajax.recommend[category], {
      credentials: 'same-origin',
      method: 'GET',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then((json) => {
      const { items, bannerUrl } = json;
      dispatch(receiveItems(items, category, bannerUrl));
    })
    .catch((err) => { throw err; });
  };
}
