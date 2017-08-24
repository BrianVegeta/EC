import { connect } from 'react-redux';

import { fetchCategories } from 'modules/categories';
import { fetchCities } from 'modules/cities';
import PublishService from '../components/PublishService';
import {
  validateAboutBy,
  validateCoversBy,
  validateDeliveryBy,
  validatePriceBy,
  validateRegulationBy,
} from '../modules/validation';
import { reset as resetCovers } from '../modules/covers';
import { reset as resetCropper } from '../modules/cropper';
import {
  reset as resetPublish,
  editPublish,
} from '../modules/publish';


/* pick props */
const mapStateToProps = (
  { environment, publish, covers },
  { location: { query } },
) => {
  const { fetchedAt } = publish;
  const { pid } = query;
  const isItemFetched = pid ? !!fetchedAt : true;
  return ({
    environment,
    touchedStepPaths: publish.touchedStepPaths,
    isCoversValid: validateCoversBy(covers).isValid,
    isAboutValid: validateAboutBy(publish).isValid,
    isDeliveryValid: validateDeliveryBy(publish).isValid,
    isPriceValid: validatePriceBy(publish).isValid,
    isRegulationValid: validateRegulationBy(publish).isValid,
    isFetched: isItemFetched,
  });
};

/* pick dispatch */
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
