/* eslint-disable class-methods-use-this */
import Attribute from './Attribute';
import { updateNickname } from '../../../../actions/authActions';

class Nickname extends Attribute {
  getAttributeName() {
    return 'nickname';
  }
  getUpdateAction() {
    return updateNickname;
  }
}
export default Nickname;
