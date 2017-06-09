import validate from 'validate.js';
import _ from 'lodash';
import { constrainter } from './constraints';
import { updateServiceDiscount } from '../../../../actions/publishActions';

class ServiceDiscount {
  constructor(discount, price, dispatch) {
    this.value = discount;
    this.price = price;
    this.dispatch = dispatch;
    this.validator = this.validator.bind(this);
    this.update = this.update.bind(this);
    this.isValid = this.isValid();
  }
  update(value) {
    this.dispatch(
      updateServiceDiscount(value),
    );
  }
  validator() {
    return validate.single(this.value, constrainter(this.price).serviceDiscount);
  }
  isValid() {
    return _.isEmpty(this.validator());
  }
}
export default ServiceDiscount;
