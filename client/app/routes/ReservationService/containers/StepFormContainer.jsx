import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { reservationService as rsRouter } from 'lib/paths';

import StepForm from '../components/StepForm';
import { changeData, touchPath } from '../modules/reservation';
import { fetchCoupons } from '../modules/reservationCoupons';
import { validateForm, validateFormBy } from '../modules/validation';

/* pick props */
const mapStateToProps = ({
  environment,
  reservationCoupons,
  reservationService,
  reservationServiceItem,
}) => {
  const coupons = reservationCoupons;
  const reservation = reservationService;
  const item = reservationServiceItem;
  const isFetched = Boolean(coupons.updatedAt && item.owner);
  const isValid = isFetched ? validateFormBy(reservation, item).isValid : false;

  return ({
    environment,
    reservationCoupons: coupons,
    reservation,
    reservationItem: item,
    isFetched: Boolean(coupons.updatedAt && item.owner),
    isValid,
  });
};

/* pick dispatch */
const { formPath, paymentPath } = rsRouter;
const mapDispatchToProps = (
  dispatch,
  { params: { pid }, location: { query: { cid } } },
) => ({
  dpFetchCoupons: () => dispatch(fetchCoupons()),
  dispatchChangeData: data => dispatch(changeData(data)),
  dispatchTouchPath: () => dispatch(touchPath(formPath(pid, cid))),
  dispatchValidate: () => dispatch(validateForm()),
  nextStep: () => browserHistory.push(paymentPath(pid, cid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepForm);
