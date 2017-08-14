import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { publishService as publishServiceRouter } from 'lib/paths';

import StepRegulation from '../components/StepRegulation';
import { changeData, touchPath } from '../modules/publish';
import { validateRegulation, validateRegulationBy } from '../modules/validation';

/* pick props */
const PATH_KEY = 'confirmPath';
const mapStateToProps = ({ environment, publish }) => ({
  environment,
  publish,
  isValid: validateRegulationBy(publish).isValid,
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatchChangeData: data => dispatch(changeData(data)),
  dispatchValidate: () => dispatch(validateRegulation()),
  dispatchTouchPath: () => dispatch(touchPath(publishServiceRouter.regulationPath)),
  nextStep: () => browserHistory.push(publishServiceRouter[PATH_KEY]),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepRegulation);
