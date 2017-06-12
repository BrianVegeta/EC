import validate from 'validate.js';
import _ from 'lodash';
import constraints from './constraints';
import {
  updateAmount,
} from '../../../../actions/publishActions';
import {
  INPUT_AMOUNT_WIDTH,
} from '../../../../constants/dimesions';
import {
  AMOUNT_MAX, AMOUNT_MIN,
} from '../../../../constants/limit';

class Amount {
  constructor(amount, dispatch) {
    this.value = amount;
    this.inputMin = AMOUNT_MIN;
    this.inputMax = AMOUNT_MAX;
    this.inputWidth = INPUT_AMOUNT_WIDTH;
    this.dispatch = dispatch;
    this.updateAmount = this.updateAmount.bind(this);
    this.amountValidator = this.amountValidator.bind(this);
  }
  updateAmount(amount) {
    this.dispatch(
      updateAmount(amount),
    );
  }
  amountValidator() {
    return validate.single(this.value, constraints.amount);
  }
  isValid() {
    return _.isEmpty(this.amountValidator());
  }
}
export default Amount;
