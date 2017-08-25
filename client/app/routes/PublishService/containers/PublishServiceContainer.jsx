import { connect } from 'react-redux';

import { fetchCategories } from 'modules/categories';
import { fetchCities } from 'modules/cities';
import { publishServiceRouter } from 'lib/paths';
import { mapSidebarSteps } from 'lib/utils';
import PublishService from '../components/PublishService';
import { reset as resetCovers } from '../modules/covers';
import { reset as resetCropper } from '../modules/cropper';
import { reset as resetPublish, editPublish } from '../modules/publish';
import {
  validateCoversBy, validateAboutBy, validateDeliveryBy, validatePriceBy,
  validateRegulationBy, validateCancelPolicyBy,
} from '../modules/validation';


const {
  indexPath,
  aboutPath,
  deliveryPath,
  pricePath,
  regulationPath,
  cancelPolicyPath,
  confirmPath,
} = publishServiceRouter;

/* =============================================>>>>>
= map props =
===============================================>>>>>*/
const mapStateToProps = (
  { environment, publish, covers },
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
  const { isValid: isDeliveryValid } = validateDeliveryBy(publish);
  const { isValid: isPriceValid } = validatePriceBy(publish);
  const { isValid: isRegulationValid } = validateRegulationBy(publish);
  const { isValid: isCancelPolicyValid } = validateCancelPolicyBy(publish);
  const steps = mapSidebarSteps([
    ['上傳照片', indexPath(pid), isCoversValid],
    ['關於服務', aboutPath(pid), isAboutValid],
    ['服務資訊', deliveryPath(pid), isDeliveryValid],
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
  dispatchFetchCategories: () => dispatch(fetchCategories()),
  dispatchFetchCities: () => dispatch(fetchCities()),
  dispatchCheckEdit: () => {
    const { pid } = query;
    if (pid) dispatch(editPublish(pid));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PublishService);
