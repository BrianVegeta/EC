import { connect } from 'react-redux';

import { fetchCategories } from 'modules/categories';
import { fetchCities } from 'modules/cities';
import { publishSpaceRouter } from 'lib/paths';
import { mapSidebarSteps } from 'lib/utils';
import PublishSpace from '../components/PublishSpace';
import { reset as resetCovers } from '../modules/covers';
import { reset as resetCropper } from '../modules/cropper';
import {
  REDUCER_KEY,
  reset as resetPublish,
  editPublish,
  touchPath,
} from '../modules/publish';
import {
  validateCoversBy, validateAboutBy, validatePriceBy,
  validateRegulationBy, validateCancelPolicyBy,
} from '../modules/validation';


const {
  indexPath,
  coverPath,
  aboutPath,
  pricePath,
  regulationPath,
  cancelPolicyPath,
  confirmPath,
} = publishSpaceRouter;

/* =============================================>>>>>
= map props =
===============================================>>>>>*/
const mapStateToProps = (
  { environment, [REDUCER_KEY]: publish, covers },
  { location: { query } },
) => {
  /* edit */
  const { fetchedAt, touchedStepPaths } = publish;
  const { pid } = query;
  const isItemFetched = pid ? !!fetchedAt : true;
  /* steps */
  const touchedPaths = pid ? null : touchedStepPaths;
  const { isValid: isCoversValid } = validateCoversBy(covers);
  const { isValid: isAboutValid } = validateAboutBy(publish);
  const { isValid: isPriceValid } = validatePriceBy(publish);
  const { isValid: isRegulationValid } = validateRegulationBy(publish);
  const { isValid: isCancelPolicyValid } = validateCancelPolicyBy(publish);
  const steps = mapSidebarSteps([
    ['上傳照片', coverPath(pid), isCoversValid],
    ['關於空間', aboutPath(pid), isAboutValid],
    ['設定價格', pricePath(pid), isPriceValid],
    ['建立分享人守則', regulationPath(pid), isRegulationValid],
    ['建立退訂政策', cancelPolicyPath(pid), isCancelPolicyValid],
    ['確認發佈', confirmPath(pid), false],
  ]);
  return ({
    environment,
    touchedPaths,
    isFetched: isItemFetched,
    steps,
  });
};

/* =============================================>>>>>
= map dispatch =
===============================================>>>>>*/
const mapDispatchToProps = (dispatch, { location: { query } }) => ({
  dispatchReset: () => {
    dispatch(resetCovers());
    dispatch(resetCropper());
    dispatch(resetPublish());
  },
  dispatchTouchPath: () => dispatch(touchPath(indexPath(query.pid))),
  dispatchFetchCategories: () => dispatch(fetchCategories()),
  dispatchFetchCities: () => dispatch(fetchCities()),
  dispatchCheckEdit: () => {
    const { pid } = query;
    if (pid) dispatch(editPublish(pid));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PublishSpace);
