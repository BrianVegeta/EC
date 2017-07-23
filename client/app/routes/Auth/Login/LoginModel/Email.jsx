/* eslint-disable class-methods-use-this */
import Attribute from './Attribute';
import { updateEmail } from '../../../../actions/authActions';

class Email extends Attribute {
  getAttributeName() {
    return 'email';
  }
  getUpdateAction() {
    return updateEmail;
  }
}
export default Email;
