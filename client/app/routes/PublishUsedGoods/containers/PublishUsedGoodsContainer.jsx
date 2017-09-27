import { connect } from 'react-redux';

import { fetchCategories } from 'modules/categories';
import { fetchCities } from 'modules/cities';
import { publishUsedGoodsRouter } from 'lib/paths';
import { mapSidebarSteps } from 'lib/utils';
import PublishGoods from '../components/PublishGoods';
import {
  REDUCER_KEY as COVERS_REDUCER_KEY,
  reset as resetCovers,
} from '../modules/covers';
import { reset as resetCropper } from '../modules/cropper';
import {
  REDUCER_KEY,
  reset as resetPublish,
  editPublish,
  touchPath,
} from '../modules/publish';
import {
  validateCoversBy, validateAboutBy, validateDeliveryBy,
} from '../modules/validation';


const {
  indexPath,
  coverPath,
  aboutPath,
  deliveryPath,
  confirmPath,
} = publishUsedGoodsRouter;

/* =============================================>>>>>
= map props =
===============================================>>>>>*/
const mapStateToProps = (
  {
    environment,
    [REDUCER_KEY]: publish,
    [COVERS_REDUCER_KEY]: covers },
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
  const steps = mapSidebarSteps([
    ['上傳照片', coverPath(pid), isCoversValid],
    ['物品及價格', aboutPath(pid), isAboutValid],
    ['送貨方式', deliveryPath(pid), isDeliveryValid],
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

export default connect(mapStateToProps, mapDispatchToProps)(PublishGoods);
