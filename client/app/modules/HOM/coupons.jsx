import { find, isEmpty } from 'lodash';
import { now } from 'lib/time';
import { asyncXhrAuthedGet } from 'lib/xhr';

export default ({
  ACTION_PREFIX,
  REDUCER_KEY,
}) => {
  // =============================================
  // = action type =
  // =============================================
  const prefix = action => (`${ACTION_PREFIX}.${action}`);
  const SET_COUPONS = prefix('SET_COUPONS');
  const RESET = prefix('RESET');
  // =============================================
  // = actions =
  // =============================================
  const setCoupons = coupons => ({
    type: SET_COUPONS,
    coupons,
    updatedAt: now(),
  });

  const fetchCoupons = () =>
    (dispatch, getState) => {
      asyncXhrAuthedGet(
        '/ajax/my_coupons.json',
        getState(),
      ).then((data) => {
        dispatch(setCoupons(data));
      });
    };

  const reset = () => ({
    type: RESET,
  });

  const getCouponOffsetFromRecords = (couponNo, records) => {
    if (!couponNo) return null;
    if (isEmpty(records)) return null;
    const coupon = find(records, { coupon_no: couponNo });
    return coupon ? coupon.amount : null;
  };

  const getCouponOffset = couponNo =>
    (dispatch, getState) => {
      const { records } = getState()[REDUCER_KEY];
      return getCouponOffsetFromRecords(couponNo, records);
    };


  // =============================================
  // = reducer =
  // =============================================
  const initialState = {
    updatedAt: null,
    records: [],
  };

  const defaultExport = (state = initialState, action) => {
    switch (action.type) {

      case SET_COUPONS:
        return Object.assign({}, state, {
          updatedAt: action.updatedAt,
          records: action.coupons,
        });

      case RESET:
        return initialState;

      default:
        return state;
    }
  };

  return {
    REDUCER_KEY,
    fetchCoupons,
    reset,
    getCouponOffsetFromRecords,
    getCouponOffset,
    defaultExport,
  };
};
