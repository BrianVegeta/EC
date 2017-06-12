// @@ service
import _ from 'lodash';
import {
  updateChargeType,
} from '../../../../actions/publishActions';

const textMap = {
  day: '以日計算',
  month: '以月計算',
};
class ChargeType {
  constructor(chargeType, dispatch) {
    this.value = chargeType;
    this.text = textMap[this.value];
    this.update = this.update.bind(this);
    this.dispatch = dispatch;
    this.isChoosed = !_.isNull(chargeType);
  }
  validator() {
    if (this.isChoosed) {
      return [];
    }
    return ['請選擇計費方式'];
  }
  isValid() {
    return this.isChoosed;
  }
  is(chargeType) {
    return this.value === chargeType;
  }
  update(value) {
    this.dispatch(updateChargeType(value));
  }
}
export default ChargeType;
