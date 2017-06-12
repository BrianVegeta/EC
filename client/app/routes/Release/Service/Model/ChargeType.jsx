// @@ service
import _ from 'lodash';
import {
  updateChargeType,
} from '../../../../actions/publishActions';

const textMap = {
  fix: '固定價格',
  count: '以數量計價',
  day: '以天數計算',
};
class ChargeType {
  constructor(chargeType, dispatch) {
    this.value = chargeType;
    this.text = textMap[this.value];
    this.update = this.update.bind(this);
    this.dispatch = dispatch;
    this.isChoosed = !_.isNull(chargeType);
  }
  is(chargeType) {
    return this.value === chargeType;
  }
  update(value) {
    this.dispatch(updateChargeType(value));
  }
}
export default ChargeType;
