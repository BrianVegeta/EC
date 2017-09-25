import couponsHom from 'modules/HOM/coupons';


const {
  REDUCER_KEY,
  fetchCoupons,
  reset,
  getCouponOffsetFromRecords,
  getCouponOffset,
  defaultExport,
} = couponsHom({
  ACTION_PREFIX: 'RESERVATION.COUPONS.SERVICE',
  REDUCER_KEY: 'reservationCoupons',
});
export {
  REDUCER_KEY,
  fetchCoupons,
  reset,
  getCouponOffsetFromRecords,
  getCouponOffset,
};
export default defaultExport;
