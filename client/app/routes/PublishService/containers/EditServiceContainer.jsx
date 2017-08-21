import { connect } from 'react-redux';

import { fetchCategories } from 'modules/categories';
import { fetchCities } from 'modules/cities';
import EditService from '../components/EditService';

import {
  validateAboutBy,
  validateCoversBy,
  validateDeliveryBy,
  validatePriceBy,
  validateRegulationBy,
} from '../modules/validation';
import { reset as resetCovers } from '../modules/covers';
import { reset as resetCropper } from '../modules/cropper';
import { reset as resetPublish } from '../modules/publish';
import { fetchService } from '../modules/fetch';

/* pick props */
const mapStateToProps = ({ environment, publish, covers }) => ({
  environment,
  touchedStepPaths: publish.touchedStepPaths,
  isCoversValid: validateCoversBy(covers).isValid,
  isAboutValid: validateAboutBy(publish).isValid,
  isDeliveryValid: validateDeliveryBy(publish).isValid,
  isPriceValid: validatePriceBy(publish).isValid,
  isRegulationValid: validateRegulationBy(publish).isValid,
});

/* pick dispatch */
const mapDispatchToProps = (dispatch, { params }) => ({
  dispatchFetch: () => dispatch(fetchService(params.pid)),
  dispatchReset: () => {
    dispatch(resetCovers());
    dispatch(resetCropper());
    dispatch(resetPublish());
  },
  dispatchFetchCategories: () => dispatch(fetchCategories()),
  dispatchFetchCities: () => dispatch(fetchCities()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditService);