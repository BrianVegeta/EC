/* eslint-disable import/prefer-default-export */
import * as TYPES from '../constants/actionTypes/home';
import { fetchGetRequest } from '../lib/xhr';

const updateStartup = (items, vendors, banners, categories) => ({
  type: TYPES.STARTUP,
  items,
  vendors,
  banners,
  categories,
});

export function startup() {
  return (dispatch) => {
    fetchGetRequest('/ajax/startup.json', (response) => {
      const { success, data } = response;
      if (success) {
        const {
          good_item_categorys,
          good_venders,
          good_items,
          banners,
        } = data;
        dispatch(
          updateStartup(
            good_items,
            good_venders,
            banners,
            good_item_categorys,
          ),
        );
      } else {

      }
    });
  };
}
