import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { publishService as publishServiceRouter } from 'lib/paths';

import StepPrice from '../components/StepPrice';
import { changeData, touchPath } from '../modules/publish';
import { validatePrice, validatePriceBy } from '../modules/validation';

/* pick props */
const mapStateToProps = ({ environment, publish }) => ({
  environment,
  publish,
  isValid: validatePriceBy(publish).isValid,
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatchChangeData: data => dispatch(changeData(data)),
  dispatchValidate: () => dispatch(validatePrice()),
  dispatchTouchPath: () => dispatch(touchPath(publishServiceRouter.pricePath)),
  nextStep: () => browserHistory.push(publishServiceRouter.regulationPath),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepPrice);
