import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { publishSpaceRouter } from 'lib/paths';
import StepRegulation from '../components/StepRegulation';
import { REDUCER_KEY, changeData, touchPath } from '../modules/publish';
import { validateRegulation, validateRegulationBy } from '../modules/validation';

/* =============================================>>>>>
= map props =
===============================================>>>>>*/
const { regulationPath, cancelPolicyPath } = publishSpaceRouter;
const mapStateToProps = ({ environment, [REDUCER_KEY]: publish }) => ({
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
