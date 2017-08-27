import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { CATEGORY_SERVICE } from 'constants/enums';
import {
  publishGoodsRouter,
  items as itemsRouter,
} from 'lib/paths';
import StepConfirm from '../components/StepConfirm';
import { savePublish, updatePublish, touchPath } from '../modules/publish';
import { validateAll, validateAllBy } from '../modules/validation';


const { confirmPath } = publishGoodsRouter;
const { servicePath: serviceItemsPath } = itemsRouter;

/* pick props */
const mapStateToProps = ({
  environment,
  routingHelper,
  publish,
  covers,
  categories,
}) => ({
  environment,
  routingHelper,
  publish,
  covers,
  categories: categories[CATEGORY_SERVICE],
  isValid: validateAllBy(publish, covers),
});

/* pick dispatch */
const mapDispatchToProps = (dispatch, { location: { query } }) => {
  const { pid } = query;
  return ({
    dispatchSavePublish: () => {
      if (pid) return dispatch(updatePublish(pid));
      return dispatch(savePublish());
    },
    dispatchValidateAll: () => dispatch(validateAll()),
    dispatchTouchPath: () => dispatch(touchPath(confirmPath(pid))),
    redirectToItems: () => browserHistory.push(serviceItemsPath),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(StepConfirm);
