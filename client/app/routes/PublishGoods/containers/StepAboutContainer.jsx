import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { publishGoodsRouter } from 'lib/paths';
import StepAbout from '../components/StepAbout';
import { changeData, touchPath } from '../modules/publish';
import { validateAboutBy, validateAbout } from '../modules/validation';

const {
  aboutPath,
  deliveryPath,
} = publishGoodsRouter;

/* pick props */
const mapStateToProps = ({ environment, publish }) => ({
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
    nextStep: () => browserHistory.push(deliveryPath(pid)),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(StepAbout);
