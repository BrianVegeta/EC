import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { publishServiceRouter } from 'lib/paths';

import StepRegulation from '../components/StepRegulation';
import { changeData, touchPath } from '../modules/publish';
import { validateRegulation, validateRegulationBy } from '../modules/validation';

/* pick props */
const { regulationPath, confirmPath } = publishServiceRouter;
const mapStateToProps = ({ environment, publish }) => ({
  environment,
  publish,
  isValid: validateRegulationBy(publish).isValid,
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatchChangeData: data => dispatch(changeData(data)),
  dispatchValidate: () => dispatch(validateRegulation()),
  dispatchTouchPath: () => dispatch(touchPath(regulationPath())),
  nextStep: () => browserHistory.push(confirmPath()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepRegulation);
