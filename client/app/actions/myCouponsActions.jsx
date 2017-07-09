/* eslint-disable import/prefer-default-export */

import * as types from 'constants/actionTypes/myCoupons';
import { fetchXhrAuthedGet } from 'lib/xhr';

const requestCoupons = () => ({
  type: types.REQUEST_COUPONS,
});

const receiveCoupons = coupons => ({
  type: types.RECEIVE_COUPONS,
  coupons,
});

export function fetchCoupons() {
  return (dispatch, getState) => {
    dispatch(requestCoupons());

    fetchXhrAuthedGet(
      '/ajax/my_coupons.json',
      getState(),
      (json) => {
        const { data } = json;
        dispatch(receiveCoupons(data));
      },
    );
  };
}
