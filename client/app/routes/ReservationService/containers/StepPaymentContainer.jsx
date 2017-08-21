import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { reservationService as rsRouter } from 'lib/paths';
import { popupAccessCheck, popupBankInfoSetup } from 'modules/popup';

import StepPayment from '../components/StepPayment';
import {
  changeData,
  touchPath,
  PAYMENT_TYPE_ATM,
  PAYMENT_TYPE_CREDIT_CARD,
} from '../modules/reservation';
import { validatePayment, validatePaymentBy } from '../modules/validation';

/* pick props */
const mapStateToProps = ({ environment, reservationService, personalBankInfo }) => {
  const { paymenttype } = reservationService;
  return ({
    environment,
    reservation: reservationService,
    isAtmChoosed: (paymenttype === PAYMENT_TYPE_ATM),
    isCreditCardChoosed: (paymenttype === PAYMENT_TYPE_CREDIT_CARD),
    isValid: validatePaymentBy(
      reservationService,
      personalBankInfo.isReady,
    ).isValid,
  });
};

/* pick dispatch */
const mapDispatchToProps = (dispatch, { params: { pid } }) => {
  /* DISPATCH 查看銀行 */
  const dispatchBankSetup = () => {
    dispatch(popupAccessCheck({
      onChecked: password => dispatch(popupBankInfoSetup({ password })),
    }));
  };
  const { paymentPath, confirmPath } = rsRouter;
  return ({
    dispatchChooseAtm: () =>
      dispatch(changeData({ paymenttype: PAYMENT_TYPE_ATM })),
    dispatchChooseCreditCard: () =>
      dispatch(changeData({ paymenttype: PAYMENT_TYPE_CREDIT_CARD })),
    dispatchBankSetup,
    dispatchValidate: () => dispatch(validatePayment()),
    dispatchTouchPath: () => dispatch(touchPath(paymentPath(pid))),
    nextStep: () => browserHistory.push(confirmPath(pid)),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(StepPayment);
