/* eslint-disable import/prefer-default-export */
import { fetchCollections } from 'modules/myCollection';
import { find } from 'lodash';
import * as TYPES from '../constants/actionTypes/home';
import { fetchXhrGet } from '../lib/xhr';

const COLLECTION_KEY = 'myCollection';
const AUTH_KEY = 'auth';

const updateStartup = (items, vendors, banners, categories) => ({
  type: TYPES.STARTUP,
  items,
  vendors,
  banners,
  categories,
});

function searchFavorite(data, collection) {
  return data.map(record =>
    Object.assign({}, record, {
      in_my_favorite: Boolean(find(collection, { pid: record.pid })),
    }),
  );
}

function fetchData(dispatch, getState, isLogin) {
  fetchXhrGet(
    '/ajax/startup.json',
    (response) => {
      const {
        good_item_categorys,
        good_venders,
        good_items,
        banners,
      } = response.data;
      if (isLogin) {
        const { records } = getState()[COLLECTION_KEY];
        good_items[0].item = searchFavorite(good_items[0].item, records);
        good_items[1].item = searchFavorite(good_items[1].item, records);
        good_items[2].item = searchFavorite(good_items[2].item, records);
      }
      dispatch(
        updateStartup(
          good_items,
          good_venders,
          banners,
          good_item_categorys,
        ),
      );
    },
  );
}
export function startup() {
  return (dispatch, getState) => {
    // TODO: change api
    const { isLogin } = getState()[AUTH_KEY];
    if (isLogin) {
      dispatch(fetchCollections()).then(() => {
        fetchData(dispatch, getState, isLogin);
      });
    } else {
      fetchData(dispatch, getState, isLogin);
    }
  };
}
