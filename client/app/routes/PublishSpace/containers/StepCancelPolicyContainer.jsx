import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { publishSpaceRouter } from 'lib/paths';
import StepCancelPolicy from '../components/StepCancelPolicy';
import { changeData, touchPath } from '../modules/publish';
import {
  validateCancelPolicy,
  validateCancelPolicyBy,
} from '../modules/validation';


/* =============================================>>>>>
= map props =
===============================================>>>>>*/
const mapStateToProps = ({ environment, publish }) => {
  const { isValid } = validateCancelPolicyBy(publish);
  return ({
    environment,
    publish,
    isValid,
  });
};

/* =============================================>>>>>
= map dispatch =
===============================================>>>>>*/
const {
  cancelPolicyPath,
  confirmPath,
} = publishSpaceRouter;
const mapDispatchToProps = (dispatch, { location: { query } }) => {
  const { pid } = query;
  return ({
    dispatchChangeData: data => dispatch(changeData(data)),
    dispatchValidate: () => dispatch(validateCancelPolicy()),
    dispatchTouchPath: () => dispatch(touchPath(cancelPolicyPath(pid))),
    nextStep: () => browserHistory.push(confirmPath(pid)),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(StepCancelPolicy);
