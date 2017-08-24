import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { CATEGORY_SERVICE } from 'constants/enums';
import {
  publishServiceRouter,
  items as itemsRouter,
} from 'lib/paths';
import StepConfirm from '../components/StepConfirm';
import { savePublish, touchPath } from '../modules/publish';
import { validateAll, validateAllBy } from '../modules/validation';

const {
  confirmPath,
} = publishServiceRouter;

/* pick props */
const mapStateToProps = ({ environment, routingHelper, publish, covers, categories }) => ({
  environment,
  routingHelper,
  publish,
  covers,
  categories: categories[CATEGORY_SERVICE],
  isValid: validateAllBy(publish, covers),
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatchSavePublish: () => dispatch(savePublish()),
  dispatchValidateAll: () => dispatch(validateAll()),
  dispatchTouchPath: () => dispatch(touchPath(confirmPath())),
  redirectToItems: () => browserHistory.push(itemsRouter.servicePath),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepConfirm);
