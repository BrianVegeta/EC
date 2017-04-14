/* eslint-disable import/prefer-default-export */
import * as TYPES from '../constants/actionTypes';

const receiveBanners = banners => ({
  type: TYPES.BANNERS_RECEIVED,
  banners,
});

const fetchingBanners = () => ({
  type: TYPES.BANNERS_FETCHING,
});

export function fetchBanners() {
  return (dispatch) => {
    dispatch(fetchingBanners());

    fetch('/ajax/banners.json', {
      credentials: 'same-origin',
      method: 'GET',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(banners => dispatch(receiveBanners(banners)))
    .catch((err) => { throw err; });
  };
}
