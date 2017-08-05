/* eslint-disable import/prefer-default-export */
import { asyncXhrAuthedPost } from 'lib/xhr';
import * as types from './actionTypes';

const fetched = records => ({
  type: types.FETCHED,
  records,
});

const fetching = () => ({
  type: types.FETCHING,
});

export function fetchCoupon() {
  return (dispatch, getState) => {
    dispatch(fetching());
    asyncXhrAuthedPost(
            '/ajax/get_coupon.json',
            {},
            getState(),
    )
    .then((responseData) => {
      dispatch(fetched(responseData));
    });
  };
}
