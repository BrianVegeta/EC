import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { publishSpaceRouter } from 'lib/paths';
import StepPrice from '../components/StepPrice';
import { changeData, touchPath } from '../modules/publish';
import { validatePrice, validatePriceBy } from '../modules/validation';


const {
  pricePath,
  regulationPath,
} = publishSpaceRouter;
/* =============================================>>>>>
= map props =
===============================================>>>>>*/
const mapStateToProps = ({ environment, publish }) => ({
  environment,
  publish,
  isValid: validatePriceBy(publish).isValid,
});

/* =============================================>>>>>
= map dispatch =
===============================================>>>>>*/
const mapDispatchToProps = (dispatch, { location: { query } }) => {
  const { pid } = query;
  return ({
    dispatchChangeData: data => dispatch(changeData(data)),
    dispatchValidate: () => dispatch(validatePrice()),
    dispatchTouchPath: () => dispatch(touchPath(pricePath(pid))),
    nextStep: () => browserHistory.push(regulationPath(pid)),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(StepPrice);
