import { connect } from 'react-redux';

import { fetchCategories } from 'modules/categories';
import { fetchCities } from 'modules/cities';
import { publishServiceRouter } from 'lib/paths';
import PublishService from '../components/PublishService';
import { reset as resetCovers } from '../modules/covers';
import { reset as resetCropper } from '../modules/cropper';
import { reset as resetPublish, editPublish } from '../modules/publish';
import {
  validateCoversBy, validateAboutBy, validateDeliveryBy, validatePriceBy,
  validateRegulationBy,
} from '../modules/validation';


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
  const {
    indexPath,
    aboutPath,
    deliveryPath,
    pricePath,
    regulationPath,
    confirmPath,
  } = publishServiceRouter;
  const { isValid: isCoversValid } = validateCoversBy(covers);
  const { isValid: isAboutValid } = validateAboutBy(publish);
  const { isValid: isDeliveryValid } = validateDeliveryBy(publish);
  const { isValid: isPriceValid } = validatePriceBy(publish);
  const { isValid: isRegulationValid } = validateRegulationBy(publish);
  const steps = [
    { text: '上傳照片', path: indexPath(pid), isValid: isCoversValid },
    { text: '關於服務', path: aboutPath(pid), isValid: isAboutValid },
    { text: '服務資訊', path: deliveryPath(pid), isValid: isDeliveryValid },
    { text: '設定價格', path: pricePath(pid), isValid: isPriceValid },
    { text: '建立分享人守則', path: regulationPath(pid), isValid: isRegulationValid },
    { text: '確認發佈', path: confirmPath(pid), isValid: false },
  ];
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
