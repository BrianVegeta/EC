import { rangeDiff } from 'lib/time';
import { formatCurrency } from 'lib/currency';
import { forEach } from 'lodash';

export default class {

  static formatDesc(text, price) {
    return { text, price };
  }

  constructor(calculationType, price, deposit, unit,
    discountList, couponPrice, startDate, endDate) {
    this.calculationType = calculationType;
    this.price = price;
    this.deposit = deposit;
    this.unit = unit;
    this.discountList = discountList; // object : { type, param, type }
    this.discountType = '';
    this.discountParam = 0;
    this.dicountUnitPrice = 0;
    this.discountPrice = 0;
    this.couponPrice = couponPrice;
    this.startDate = startDate;
    this.endDate = endDate;
    this.day = 0;
    this.total_rent = 0;
    this.total_price = 0;
    this.process();
  }

  process() {
    // calculate total rent
    this.day = (this.startDate && this.endDate) ? rangeDiff(this.startDate, this.endDate, true) : 1;
    this.unit = this.unit ? this.unit : 1;
    this.total_rent = this.day * this.unit * this.price;
    // calculate discount
    forEach(this.discountList, (value) => {
      switch (value.type) {
        case 'FIX':
          if (this.day >= value.param && value.param > this.discountParam) {
            this.discountType = value.type;
            this.discountParam = value.param;
            this.dicountUnitPrice = value.discount;
          }
          break;
        case 'GREATER_OR_EQUAL_TO_N_COUNT':
          this.discountType = value.type;
          this.discountParam = value.param;
          this.dicountUnitPrice = value.discount;
          break;
        case 'GREATER_OR_EQUAL_TO_N_MONTH':
          if (this.day >= value.param && value.param > this.discountParam) {
            this.discountType = value.type;
            this.discountParam = value.param;
            this.dicountUnitPrice = value.discount;
          }
          break;
        case 'GREATER_OR_EQUAL_TO_N_DAY':
          if (this.day >= value.param && value.param > this.discountParam) {
            this.discountType = value.type;
            this.discountParam = value.param;
            this.dicountUnitPrice = value.discount;
          }
          break;
        default:
          break;
      }
      // console.log('end loop');
      // console.log(this.day);
      // console.log(this.discountType);
      // console.log(this.discountParam);
      // console.log(this.dicountUnitPrice);
    });
    this.discountPrice = this.day * this.dicountUnitPrice;
    this.total_price = (((this.total_rent + this.deposit) - this.couponPrice) - this.discountPrice);
    // console.log(this.total_rent);
    // console.log(this.deposit);
    // console.log(this.couponPrice);
    // console.log(this.discountPrice);
    // console.log(this.total_price);
  }

  getDays() {
    const { startDate, endDate } = this.reservation;
    return (startDate && endDate) ? rangeDiff(startDate, endDate, true) : 1;
  }

  getAmount() {
    const { amount } = this.reservation;
    return amount || 1;
  }

  getPriceDesc() {
    return this.constructor.formatDesc(
      `租金 ${formatCurrency(this.price)} x ${this.day}天 x ${this.unit}件`,
      this.total_rent,
    );
  }

  getDepositDesc() {
    return (this.deposit > 0) ? this.constructor.formatDesc('押金', this.deposit) : null;
  }

  getCouponDesc() {
    return (this.couponPrice > 0) ? this.constructor.formatDesc('折價券', this.couponPrice) : null;
  }

  getDiscountDesc() {
    switch (this.discountType) {
      case 'FIX':
        return this.constructor.formatDesc(`租滿${this.discountParam}天，折抵金額`, this.discountPrice);
      case 'GREATER_OR_EQUAL_TO_N_COUNT':
        return this.constructor.formatDesc('只要預定，折抵金額', this.discountPrice);
      case 'GREATER_OR_EQUAL_TO_N_MONTH':
        return this.constructor.formatDesc(`租滿${this.discountParam}個月，折抵金額`, this.discountPrice);
      case 'GREATER_OR_EQUAL_TO_N_DAY':
        return this.constructor.formatDesc(`租滿${this.discountParam}天，折抵金額`, this.discountPrice);
      default:
    }
    return null;
  }
}
