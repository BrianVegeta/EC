import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { reservationService as rsRouter } from 'lib/paths';

import StepPayment from '../components/StepPayment';
import { changeData, touchPath } from '../modules/reservation';
// import { validatePrice, validatePriceBy } from '../modules/validation';

/* pick props */
const mapStateToProps = ({ environment, reservation }) => ({
  environment,
  reservation,
  // isValid: validatePriceBy(publish).isValid,
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatchChangeData: data => dispatch(changeData(data)),
  // dispatchValidate: () => dispatch(validatePrice()),
  dispatchTouchPath: () => dispatch(touchPath(rsRouter.paymentPath)),
  nextStep: () => browserHistory.push(rsRouter.confirmPath),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepPayment);
