import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { publishServiceRouter } from 'lib/paths';
import StepPrice from '../components/StepPrice';
import { changeData, touchPath } from '../modules/publish';
import { validatePrice, validatePriceBy } from '../modules/validation';


const {
  pricePath,
  regulationPath,
} = publishServiceRouter;
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
  dispatchTouchPath: () => dispatch(touchPath(pricePath())),
  nextStep: () => browserHistory.push(regulationPath()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepPrice);
