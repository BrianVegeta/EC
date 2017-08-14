import { connect } from 'react-redux';

import PublishService from '../components/PublishService';
import {
  validateAboutBy,
  validateCoversBy,
  validateDeliveryBy,
  validatePriceBy,
  validateRegulationBy,
} from '../modules/validation';

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

export default connect(mapStateToProps)(PublishService);
