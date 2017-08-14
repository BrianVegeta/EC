import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { publishService as publishServiceRouter } from 'lib/paths';

import StepAbout from '../components/StepAbout';
import { changeData, touchPath } from '../modules/publish';
import { validateAboutBy, validateAbout } from '../modules/validation';

/* pick props */
const mapStateToProps = ({ environment, publish }) => ({
  environment,
  publish,
  isValid: validateAboutBy(publish).isValid,
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatchChangeData: data => dispatch(changeData(data)),
  dispatchValidate: () => dispatch(validateAbout()),
  dispatchTouchPath: () => dispatch(touchPath(publishServiceRouter.aboutPath)),
  nextStep: () => browserHistory.push(publishServiceRouter.deliveryPath),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepAbout);
