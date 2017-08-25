import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { publishServiceRouter } from 'lib/paths';
import StepRegulation from '../components/StepRegulation';
import { changeData, touchPath } from '../modules/publish';
import { validateRegulation, validateRegulationBy } from '../modules/validation';

/* =============================================>>>>>
= map props =
===============================================>>>>>*/
const { regulationPath, cancelPolicyPath } = publishServiceRouter;
const mapStateToProps = ({ environment, publish }) => ({
  environment,
  publish,
  isValid: validateRegulationBy(publish).isValid,
});

/* =============================================>>>>>
= map dispatch =
===============================================>>>>>*/
const mapDispatchToProps = (dispatch, { location: { query } }) => {
  const { pid } = query;
  return ({
    dispatchChangeData: data => dispatch(changeData(data)),
    dispatchValidate: () => dispatch(validateRegulation()),
    dispatchTouchPath: () => dispatch(touchPath(regulationPath(pid))),
    nextStep: () => browserHistory.push(cancelPolicyPath(pid)),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(StepRegulation);
