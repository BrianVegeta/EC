import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { publishServiceRouter } from 'lib/paths';

import StepDelivery from '../components/StepDelivery';
import {
  changeData,
  touchPath,
} from '../modules/publish';
import { validateDelivery, validateDeliveryBy } from '../modules/validation';

const { deliveryPath, pricePath } = publishServiceRouter;
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
  dispatchTouchPath: () => dispatch(touchPath(deliveryPath())),
  nextStep: () => browserHistory.push(pricePath()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepDelivery);
