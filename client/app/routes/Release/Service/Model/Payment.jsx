import validate from 'validate.js';
import _ from 'lodash';
import constraints, { numberNotInRage } from './constraints';
import {
  updatePrice,
  updateDeposit,
} from '../../../../actions/publishActions';

class Payment {
  constructor(price, deposit, dispatch) {
    this.dispatch = dispatch;
    this.price = price;
    this.deposit = deposit;
    this.priceValidator = this.priceValidator.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
    this.depositValidator = this.depositValidator.bind(this);
    this.updateDeposit = this.updateDeposit.bind(this);
  }
  validator(name) {
    return validate.single(this[name], constraints[name]);
  }
  // price
  priceValidator() {
    return this.validator('price');
  }
  isPriceValid() {
    return _.isEmpty(this.priceValidator());
  }
  updatePrice(value) {
    this.dispatch(updatePrice(value));
  }
  // deposit
  depositValidator() {
    validate.validators.numberNotInRage = numberNotInRage;
    return this.validator('deposit');
  }
  isDepositValid() {
    return _.isEmpty(this.depositValidator());
  }
  updateDeposit(value) {
    this.dispatch(updateDeposit(value));
  }
}
export default Payment;
