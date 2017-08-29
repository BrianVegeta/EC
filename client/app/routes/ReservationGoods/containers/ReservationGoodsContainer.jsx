import { connect } from 'react-redux';
import { reservationGoods as rsRouter } from 'lib/paths';
import { mapSidebarSteps } from 'lib/utils';
import {
  checkReadyAndSet,
  reset as resetBankInfo,
} from 'modules/personalBankInfo';
import {
  fetchItem,
  reset as resetItem,
} from '../modules/reservationItem';
import {
  editReservation,
  reset as resetReservation,
} from '../modules/reservation';
import Component from '../components/ReservationGoods';
import { validateFormBy, validatePaymentBy } from '../modules/validation';


const {
  formPath,
  paymentPath,
  confirmPath,
} = rsRouter;

/* pick props */
const mapStateToProps = ({
  environment,
  reservationCoupons,
  reservationGoods: reservation,
  reservationGoodsItem: item,
  personalBankInfo: { isReady: isBankReady },
}, { params: { pid }, location: { query: { cid } } }) => {
  const { touchedStepPaths } = reservation;
  const touchedPaths = cid ? null : touchedStepPaths;
  const isFetched = Boolean(item.owner);
  const { isValid: isFormValid } = isFetched ?
    validateFormBy(reservation, item) : { isValid: false };
  const { isValid: isPaymentValid } = validatePaymentBy(reservation, isBankReady);

  const steps = mapSidebarSteps([
    ['填寫預訂資訊', formPath(pid, cid), isFetched ? isFormValid : false],
    ['支付方式', paymentPath(pid, cid), isPaymentValid],
    ['確認預訂資訊', confirmPath(pid, cid), false],
  ]);

  return ({
    environment,
    touchedPaths,
    reservation,
    steps,
    isFetched,
  });
};

/* pick dispatch */
const mapDispatchToProps = (
  dispatch,
  { params: { pid }, location: { query: { cid } } },
) => ({
  dispatchFetchItem: () => dispatch(fetchItem(pid)),
  dispatchReset: () => {
    dispatch(resetItem());
    dispatch(resetReservation());
  },
  dispatchCheckBankInfoReady: () => dispatch(checkReadyAndSet()),
  dispatchResetBankInfo: () => dispatch(resetBankInfo()),
  dispatchCheckEdit: () => {
    if (cid) dispatch(editReservation(cid));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
