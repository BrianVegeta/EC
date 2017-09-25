import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { reservationGoods as rsRouter } from 'lib/paths';
import StepForm from '../components/StepForm';
import { changeData, changeMonth, touchPath } from '../modules/reservation';
import { fetchCoupons, getCouponOffset } from '../modules/reservationCoupons';
import { validateForm, validateFormBy } from '../modules/validation';

/* pick props */
const mapStateToProps = ({
  environment,
  reservationCoupons: coupons,
  reservationGoods: reservation,
  reservationGoodsItem: item,
}) => {
  const isFetched = Boolean(coupons.updatedAt && item.owner);
  const { isValid, errors } = isFetched ?
    validateFormBy(reservation, item, coupons) :
    { isValid: false, errors: undefined };
  const totalError = (errors && errors.priceTotal && errors.priceTotal[0]) ?
    errors.priceTotal[0] : null;

  return ({
    environment,
    reservationCoupons: coupons,
    reservation,
    reservationItem: item,
    isFetched,
    isValid,
    totalError,
  });
};

/* pick dispatch */
const { formPath, paymentPath } = rsRouter;
const mapDispatchToProps = (
  dispatch,
  { params: { pid }, location: { query: { cid } } },
) => ({
  dpFetchCoupons: () => dispatch(fetchCoupons()),
  dispatchGetCouponOffset: couponNo => dispatch(getCouponOffset(couponNo)),
  dispatchChangeData: data => dispatch(changeData(data)),
  dispatchChangeMonth: (leasestart, month) => dispatch(changeMonth(leasestart, month)),
  dispatchTouchPath: () => dispatch(touchPath(formPath(pid, cid))),
  dispatchValidate: () => dispatch(validateForm()),
  nextStep: () => browserHistory.push(paymentPath(pid, cid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepForm);
