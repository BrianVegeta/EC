import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { CATEGORY_GOODS } from 'constants/enums';
import {
  publishUsedGoodsRouter,
  items as itemsRouter,
} from 'lib/paths';
import { asyncCheckReady } from 'modules/personalBankInfo';
import { popupAccessCheck, popupBankInfoSetup } from 'modules/popup';
import StepConfirm from '../components/StepConfirm';
import { REDUCER_KEY, savePublish, updatePublish, touchPath } from '../modules/publish';
import { REDUCER_KEY as COVERS_REDUCER_KEY } from '../modules/covers';
import { validateAll, validateAllBy } from '../modules/validation';


const { confirmPath } = publishUsedGoodsRouter;
const { usedGoodsPath } = itemsRouter;

/* pick props */
const mapStateToProps = ({
  environment,
  routingHelper,
  [REDUCER_KEY]: publish,
  [COVERS_REDUCER_KEY]: covers,
  categories,
  personalBankInfo,
}) => ({
  environment,
  routingHelper,
  publish,
  covers,
  categories: categories[CATEGORY_GOODS],
  isValid: validateAllBy(publish, covers, personalBankInfo.isReady),
  personalBankInfo,
});

/* pick dispatch */
const mapDispatchToProps = (dispatch, { location: { query } }) => {
  const { pid } = query;
  const popupBankSetup = (password) => {
    dispatch(popupBankInfoSetup({ password }));
  };
  const dispatchBankSetup = () => {
    dispatch(popupAccessCheck({
      onChecked: popupBankSetup,
    }));
  };
  return ({
    dispatchSavePublish: () => {
      if (pid) return dispatch(updatePublish(pid));
      return dispatch(savePublish());
    },
    dispatchCheckReady: () => dispatch(asyncCheckReady()),
    dispatchBankSetup,
    dispatchValidateAll: () => dispatch(validateAll()),
    dispatchTouchPath: () => dispatch(touchPath(confirmPath(pid))),
    redirectToItems: () => browserHistory.push(usedGoodsPath),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(StepConfirm);
