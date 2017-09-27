import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { publishSpaceRouter } from 'lib/paths';
import StepAbout from '../components/StepAbout';
import { REDUCER_KEY, changeData, touchPath } from '../modules/publish';
import { validateAboutBy, validateAbout } from '../modules/validation';

const {
  aboutPath,
  pricePath,
} = publishSpaceRouter;

/* pick props */
const mapStateToProps = ({ environment, [REDUCER_KEY]: publish }) => ({
  environment,
  publish,
  isValid: validateAboutBy(publish).isValid,
});

/* pick dispatch */
const mapDispatchToProps = (dispatch, { location: { query } }) => {
  const { pid } = query;
  return ({
    dispatchChangeData: data => dispatch(changeData(data)),
    dispatchValidate: () => dispatch(validateAbout()),
    dispatchTouchPath: () => dispatch(touchPath(aboutPath(pid))),
    nextStep: () => browserHistory.push(pricePath(pid)),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(StepAbout);
