/* eslint-disable import/prefer-default-export */
import * as TYPES from '../constants/actionTypes/home';
import { fetchXhrGet } from '../lib/xhr';

const updateStartup = (items, vendors, banners, categories) => ({
  type: TYPES.STARTUP,
  items,
  vendors,
  banners,
  categories,
});

export function startup() {
  return (dispatch) => {
    // TODO: change api
    fetchXhrGet(
      '/ajax/startup.json',
      (response) => {
        const {
          good_item_categorys,
          good_venders,
          good_items,
          banners,
        } = response.data;

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
  };
}
