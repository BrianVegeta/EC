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
// import { validatePrice, validatePriceBy } from '../modules/validation';

/* pick props */
const mapStateToProps = ({ environment, reservationService }) => {
  const { paymenttype } = reservationService;
  return ({
    environment,
    reservation: reservationService,
    isAtmChoosed: (paymenttype === PAYMENT_TYPE_ATM),
    isCreditCardChoosed: (paymenttype === PAYMENT_TYPE_CREDIT_CARD),
    // isValid: validatePriceBy(publish).isValid,
    isValid: false,
  });
};

/* pick dispatch */
const mapDispatchToProps = (dispatch) => {
  /* DISPATCH 查看銀行 */
  const dispatchBankSetup = () => {
    dispatch(popupAccessCheck({
      onChecked: password => dispatch(popupBankInfoSetup({ password })),
    }));
  };

  return ({
    dispatchChooseAtm: () =>
      dispatch(changeData({ paymenttype: PAYMENT_TYPE_ATM })),
    dispatchChooseCreditCard: () =>
      dispatch(changeData({ paymenttype: PAYMENT_TYPE_CREDIT_CARD })),
    dispatchBankSetup,
    // dispatchValidate: () => dispatch(validatePrice()),
    dispatchValidate: () => console.log('validate'),
    dispatchTouchPath: () => dispatch(touchPath(rsRouter.paymentPath)),
    nextStep: () => browserHistory.push(rsRouter.confirmPath),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(StepPayment);
