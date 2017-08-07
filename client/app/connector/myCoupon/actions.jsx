/* eslint-disable import/prefer-default-export */
import { asyncXhrAuthedPost } from 'lib/xhr';
import * as types from './actionTypes';

const fetching = () => ({
  type: types.FETCHING,
});

const fetched = records => ({
  type: types.FETCHED,
  records,
});

export function fetchCoupons() {
  return (dispatch, getState) => {
    dispatch(fetching());
    asyncXhrAuthedPost('/ajax/get_coupon.json', {}, getState())
    .then((responseData) => {
      dispatch(fetched(responseData));
    });
  };
}
