import { connect } from 'react-redux';

import PublishService from '../components/PublishService';
import {
  validateAboutBy,
  validateCoversBy,
  validateDeliveryBy,
} from '../modules/validation';

/* pick props */
const mapStateToProps = ({ environment, publish, covers }, { location }) => ({
  environment,
  isCoversValid: validateCoversBy(covers).isValid,
  isAboutValid: validateAboutBy(publish).isValid,
  isDeliveryValid: validateDeliveryBy(publish).isValid,
  currentPath: location.pathname,
});

export default connect(mapStateToProps)(PublishService);
