import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { publishService as publishServiceRouter } from 'lib/paths';

import StepDelivery from '../components/StepDelivery';
import {
  changeData,
} from '../modules/publish';
import { validateDelivery, validateDeliveryBy } from '../modules/validation';

/* pick props */
const mapStateToProps = ({ environment, publish }) => ({
  environment,
  publish,
  isValid: validateDeliveryBy(publish).isValid,
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatchChangeData: data => dispatch(changeData(data)),
  dispatchValidate: () => dispatch(validateDelivery()),
  nextStep: () => browserHistory.push(publishServiceRouter.pricePath),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepDelivery);
