import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { reservationGoods as rsRouter } from 'lib/paths';
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
const mapStateToProps = ({ environment, reservationGoods, personalBankInfo }) => {
  const { paymenttype } = reservationGoods;
  return ({
    environment,
    reservation: reservationGoods,
    isAtmChoosed: (paymenttype === PAYMENT_TYPE_ATM),
    atmBankName: personalBankInfo.bankName,
    isCreditCardChoosed: (paymenttype === PAYMENT_TYPE_CREDIT_CARD),
    isValid: validatePaymentBy(
      reservationGoods,
      personalBankInfo.isReady,
    ).isValid,
  });
};

/* pick dispatch */
const mapDispatchToProps = (
  dispatch,
  { params: { pid }, location: { query: { cid } } },
) => {
  /* DISPATCH 查看銀行 */
  const popupBankSetup = password =>
    dispatch(popupBankInfoSetup({ password }));
  const dispatchBankSetup = () => {
    dispatch(popupAccessCheck({
      onChecked: popupBankSetup,
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
    dispatchTouchPath: () => dispatch(touchPath(paymentPath(pid, cid))),
    nextStep: () => browserHistory.push(confirmPath(pid, cid)),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(StepPayment);
