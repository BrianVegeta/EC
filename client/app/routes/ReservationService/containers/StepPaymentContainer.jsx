import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { reservationService as rsRouter } from 'lib/paths';

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
const mapDispatchToProps = dispatch => ({
  dispatchChooseAtm: () =>
    dispatch(changeData({ paymenttype: PAYMENT_TYPE_ATM })),
  dispatchChooseCreditCard: () =>
    dispatch(changeData({ paymenttype: PAYMENT_TYPE_CREDIT_CARD })),
  // dispatchValidate: () => dispatch(validatePrice()),
  dispatchValidate: () => console.log('validate'),
  dispatchTouchPath: () => dispatch(touchPath(rsRouter.paymentPath)),
  nextStep: () => browserHistory.push(rsRouter.confirmPath),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepPayment);
