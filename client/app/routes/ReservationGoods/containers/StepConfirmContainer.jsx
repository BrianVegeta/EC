import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import {
  reservationGoods as rsRouter,
  my,
} from 'lib/paths';
import { addToChatRoom } from 'modules/chatRooms';
import { fetchCoupons } from '../modules/reservationCoupons';
import StepConfirm from '../components/StepConfirm';
import {
  changeData,
  touchPath,
  saveReservation,
  updateReservation,
} from '../modules/reservation';
import { validateAll, validateAllBy, validateAgree } from '../modules/validation';

/* pick props */
const mapStateToProps = ({
  environment,
  routingHelper,
  reservationGoods: reservation,
  reservationGoodsItem: reservationItem,
  reservationCoupons,
  personalBankInfo,
}) => {
  const isFetched = Boolean(
    reservationCoupons.updatedAt && reservationItem.owner,
  );
  const { isValid, errors } = isFetched ? validateAllBy(
    reservation, reservationItem, reservationCoupons,
    personalBankInfo.isReady,
  ) : { isValid: false, errors: undefined };
  const totalError = (errors && errors.priceTotal && errors.priceTotal[0]) ?
    errors.priceTotal[0] : null;
  return ({
    environment,
    routingHelper,
    reservation,
    reservationItem,
    reservationCoupons,
    isFetched,
    isValid,
    totalError,
  });
};

/* pick dispatch */
const { confirmPath } = rsRouter;
const mapDispatchToProps = (
  dispatch,
  { params: { pid }, location: { query: { cid } } },
) => ({
  dispatchFetchCoupons: () => dispatch(fetchCoupons()),
  dispatchTouchPath: () => dispatch(touchPath(confirmPath(pid, cid))),
  dispatchChangeData: data => dispatch(changeData(data)),
  dispatchValidateAll: () => dispatch(validateAll()),
  dispatchValidate: () => dispatch(validateAgree()),
  dispatchSaveReservation: () => {
    if (cid) return dispatch(updateReservation(cid));
    return dispatch(saveReservation());
  },
  dispatchAddToChatRoom: (uid, name, picture) =>
    dispatch(addToChatRoom({ uid, name, picture })),
  redirectToMyOrder: () => browserHistory.push(my.lesseeOrderItem('TAB_REQUEST')),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepConfirm);
