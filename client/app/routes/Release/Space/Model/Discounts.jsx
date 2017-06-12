import validate from 'validate.js';
import numeral from 'numeral';
import _ from 'lodash';
import constraints from './constraints';
import {
  updateDiscounts,
} from '../../../../actions/publishActions';

class Discounts {
  static isDuplicate(discounts) {
    const uniqs = _.uniqBy(discounts, 'offer');
    return uniqs.length !== discounts.length;
  }
  constructor(discounts, dispatch) {
    this.values = discounts;
    this.dispatch = dispatch;
    this.update = this.update.bind(this);
    this.texts = this.getTexts();
    this.isSettedUp = !_.isEmpty(this.values);
  }
  validator() {

  }
  isValid() {
    const isDuplicate = !this.constructor.isDuplicate(this.values);
    const isAllPresence = _.filter(this.values, discount =>
      !discount.days || !discount.offer,
    ).length <= 0;
    return isDuplicate && isAllPresence;
  }
  update(discounts) {
    this.dispatch(updateDiscounts(discounts));
  }
  getTexts() {
    return this.values.map(discount => `滿${discount.days}以上，${numeral(discount.offer).format('$0,000')}元優惠`);
  }
}
export default Discounts;
