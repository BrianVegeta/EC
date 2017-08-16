import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { reservationService as rsRouter } from 'lib/paths';

import StepForm from '../components/StepForm';
import { changeData, touchPath } from '../modules/reservation';
import { fetchCoupons } from '../modules/reservationCoupons';
// import { validateAboutBy, validateAbout } from '../modules/validation';

/* pick props */
const mapStateToProps = ({
  environment,
  reservationCoupons,
  reservationService,
  reservationServiceItem,
}) => ({
  environment,
  reservationCoupons,
  reservation: reservationService,
  reservationItem: reservationServiceItem,
  isFetched:
    Boolean(reservationCoupons.updatedAt && reservationServiceItem.owner),
  isValid: true,
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dpFetchCoupons: () => dispatch(fetchCoupons()),
  dispatchChangeData: data => dispatch(changeData(data)),

  // dispatchValidate: () => dispatch(validateAbout()),
  dispatchTouchPath: () => dispatch(touchPath(rsRouter.formPath)),
  nextStep: () => browserHistory.push(rsRouter.confirmPath),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepForm);
