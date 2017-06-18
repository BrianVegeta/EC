/* eslint-disable class-methods-use-this */
import Attribute from './Attribute';
import { updatePassword } from '../../../../actions/authActions';

class Password extends Attribute {
  getAttributeName() {
    return 'password';
  }
  getUpdateAction() {
    return updatePassword;
  }
}
export default Password;
