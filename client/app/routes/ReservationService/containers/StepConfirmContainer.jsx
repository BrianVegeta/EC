import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import {
  reservationService as rsRouter,
  my,
} from 'lib/paths';
import { fetchCoupons } from '../modules/reservationCoupons';
import StepConfirm from '../components/StepConfirm';
import { changeData, touchPath, saveReservation } from '../modules/reservation';
import { validateAll, validateAllBy, validateAgree } from '../modules/validation';

/* pick props */
const mapStateToProps = ({
  environment,
  reservationService: reservation,
  reservationServiceItem: reservationItem,
  reservationCoupons,
}) => {
  const isFetched = Boolean(
    reservationCoupons.updatedAt && reservationItem.owner,
  );
  const isValid = isFetched ? validateAllBy(
    reservation,
    reservationItem,
  ).isValid : false;
  return ({
    environment,
    reservation,
    reservationItem,
    reservationCoupons,
    isFetched,
    isValid,
  });
};

/* pick dispatch */
const { confirmPath } = rsRouter;
const mapDispatchToProps = (dispatch, { params: { pid } }) => ({
  dispatchFetchCoupons: () => dispatch(fetchCoupons()),
  dispatchTouchPath: () => dispatch(touchPath(confirmPath(pid))),
  dispatchChangeData: data => dispatch(changeData(data)),
  dispatchValidateAll: () => dispatch(validateAll()),
  dispatchValidate: () => dispatch(validateAgree()),
  dispatchSaveReservation: () => dispatch(saveReservation()),
  redirectToMyOrder: () => browserHistory.push(my.ownerOrderService('TAB_REQUEST')),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepConfirm);
