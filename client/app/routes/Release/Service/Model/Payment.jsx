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
    this.totalPay = this.calTotalPay();
    console.log(this.totalPay);
    this.priceValidator = this.priceValidator.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
    this.depositValidator = this.depositValidator.bind(this);
    this.updateDeposit = this.updateDeposit.bind(this);
    this.isTotalPayValid = this.isTotalPayValid();
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
  // totalPay
  calTotalPay() {
    const priceNum = _.parseInt(this.price);
    const depositNum = _.parseInt(this.deposit);
    if (isNaN(priceNum) || isNaN(depositNum)) {
      return 0;
    }
    return (priceNum + depositNum);
  }
  totalPayValidator() {
    return this.validator('totalPay');
  }
  isTotalPayValid() {
    return _.isEmpty(this.totalPayValidator());
  }
}
export default Payment;
