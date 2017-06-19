/* eslint-disable class-methods-use-this */
import Attribute from './Attribute';
import { updatePhone } from '../../../../actions/authActions';

class Phone extends Attribute {
  getAttributeName() {
    return 'phone';
  }
  getUpdateAction() {
    return updatePhone;
  }
}
export default Phone;
