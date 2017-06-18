/* eslint-disable class-methods-use-this */
import Attribute from './Attribute';
import { updateVerifyCode } from '../../../../actions/authActions';

class VerifyCode extends Attribute {
  getAttributeName() {
    return 'VerifyCode';
  }
  getUpdateAction() {
    return updateVerifyCode;
  }
}
export default VerifyCode;
