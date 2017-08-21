import { connect } from 'react-redux';
// import { browserHistory } from 'react-router';
import { reservationService as rsRouter } from 'lib/paths';
import {
  fetchCoupons,
} from '../modules/reservationCoupons';

import StepConfirm from '../components/StepConfirm';
import {
  changeData,
  touchPath,
} from '../modules/reservation';

/* pick props */
const mapStateToProps = ({
  environment,
  reservationService,
  reservationServiceItem,
  reservationCoupons,
}) => ({
  environment,
  reservation: reservationService,
  reservationItem: reservationServiceItem,
  reservationCoupons,
  isFetched: Boolean(reservationCoupons.updatedAt && reservationServiceItem.owner),
  isValid: false,
});

/* pick dispatch */
const { confirmPath } = rsRouter;
const mapDispatchToProps = (dispatch, { params: { pid } }) => ({
  dispatchFetchCoupons: () => dispatch(fetchCoupons()),
  dispatchTouchPath: () => dispatch(touchPath(confirmPath(pid))),
  dispatchChangeData: data => dispatch(changeData(data)),
  // redirectToItems: () => browserHistory.push(itemsRouter.servicePath),

});

export default connect(mapStateToProps, mapDispatchToProps)(StepConfirm);
