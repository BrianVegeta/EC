import { connect } from 'react-redux';
import { reservationService as rsRouter } from 'lib/paths';
import { mapSidebarSteps } from 'lib/utils';
import {
  checkReadyAndSet,
  reset as resetBankInfo,
} from 'modules/personalBankInfo';
import {
  fetchItem,
  reset as resetItem,
} from '../modules/reservationItem';
import Component from '../components/ReservationService';
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
  reservationService: reservation,
  reservationServiceItem: item,
  personalBankInfo: { isReady: isBankReady },
}, { params: { pid } }) => {
  const { touchedStepPaths } = reservation;
  const isFetched = Boolean(item.owner);
  const { isValid: isFormValid } = isFetched ?
    validateFormBy(reservation, item) : { isValid: false };
  const { isValid: isPaymentValid } = validatePaymentBy(reservation, isBankReady);

  const steps = mapSidebarSteps([
    ['填寫預訂資訊', formPath(pid), isFetched ? isFormValid : false],
    ['支付方式', paymentPath(pid), isPaymentValid],
    ['確認預訂資訊', confirmPath(pid), false],
  ]);

  return ({
    environment,
    touchedPaths: touchedStepPaths,
    reservation,
    steps,
    isFetched,
  });
};

/* pick dispatch */
const mapDispatchToProps = (dispatch, { params }) => ({
  dispatchFetchItem: () => dispatch(fetchItem(params.pid)),
  dispatchReset: () => dispatch(resetItem()),
  dispatchCheckBankInfoReady: () => dispatch(checkReadyAndSet()),
  dispatchResetBankInfo: () => dispatch(resetBankInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
