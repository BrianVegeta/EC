import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { publishUsedGoodsRouter } from 'lib/paths';
import StepDelivery from '../components/StepDelivery';
import { changeData, touchPath } from '../modules/publish';
import { validateDelivery, validateDeliveryBy } from '../modules/validation';


const { deliveryPath, confirmPath } = publishUsedGoodsRouter;
/* =============================================>>>>>
= map props =
===============================================>>>>>*/
const mapStateToProps = ({ environment, publish }) => ({
  environment,
  publish,
  isValid: validateDeliveryBy(publish).isValid,
});

/* =============================================>>>>>
= map dispatch =
===============================================>>>>>*/
const mapDispatchToProps = (dispatch, { location: { query } }) => {
  const { pid } = query;
  return ({
    dispatchChangeData: data => dispatch(changeData(data)),
    dispatchValidate: () => dispatch(validateDelivery()),
    dispatchTouchPath: () => dispatch(touchPath(deliveryPath(pid))),
    nextStep: () => browserHistory.push(confirmPath(pid)),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(StepDelivery);
