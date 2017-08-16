import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

// import { CATEGORY_SERVICE } from 'constants/enums';
import {
  publishService as publishServiceRouter,
  items as itemsRouter,
} from 'lib/paths';

import StepConfirm from '../components/StepConfirm';
import { saveReservation, touchPath } from '../modules/reservation';
// import {
//   validateAll,
//   validateAllBy,
// } from '../modules/validation';

/* pick props */
const mapStateToProps = ({ environment, reservation }) => ({
  environment,
  reservation,
  // categories: categories[CATEGORY_SERVICE],
  // isValid: validateAllBy(publish, covers),
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  // dispatchSavePublish: () => dispatch(saveReservation()),
  // dispatchValidateAll: () => dispatch(validateAll()),
  dispatchTouchPath: () => dispatch(touchPath(publishServiceRouter.confirmPath)),
  redirectToItems: () => browserHistory.push(itemsRouter.servicePath),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepConfirm);
