import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { CATEGORY_GOODS } from 'constants/enums';
import {
  publishGoodsRouter,
  items as itemsRouter,
} from 'lib/paths';
import StepConfirm from '../components/StepConfirm';
import {
  REDUCER_KEY,
  savePublish,
  updatePublish,
  touchPath,
} from '../modules/publish';
import { REDUCER_KEY as COVERS_REDUCER_KEY } from '../modules/covers';
import { validateAll, validateAllBy } from '../modules/validation';


const { confirmPath } = publishGoodsRouter;
const { goodsPath } = itemsRouter;

/* pick props */
const mapStateToProps = ({
  environment,
  routingHelper,
  [REDUCER_KEY]: publish,
  [COVERS_REDUCER_KEY]: covers,
  categories,
}) => ({
  environment,
  routingHelper,
  publish,
  covers,
  categories: categories[CATEGORY_GOODS],
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
    redirectToItems: () => browserHistory.push(goodsPath),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(StepConfirm);
