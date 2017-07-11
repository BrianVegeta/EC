import { rangeDiff } from 'lib/time';
import { formatCurrency } from 'lib/currency';

export default class {

  static formatDesc(text, price) {
    return { text, price };
  }

  constructor(itemDetail, reservation, dispatch) {
    this.dispatch = dispatch;

    this.itemDetail = itemDetail;
    this.reservation = reservation;

    this.total = 0;
    this.days = this.getDays();
    this.amount = this.getAmount();
    this.priceDesc = this.getPriceDesc();
    this.depositDesc = this.getDepositDesc();
    this.couponDesc = this.getCouponDesc();
    this.discountDesc = this.getDiscountDesc();
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
    const { startDate, endDate, amount } = this.reservation;
    const { price } = this.itemDetail;

    const days = (startDate && endDate) ? rangeDiff(startDate, endDate, true) : 1;
    const orderAmount = amount || 1;


    this.total += days * orderAmount * price;
    return this.constructor.formatDesc(
      `租金 ${formatCurrency(price)} x ${days}天 x ${orderAmount}件`,
      this.days * this.amount * price,
    );
  }

  getDepositDesc() {
    const { deposit } = this.itemDetail;
    if (deposit > 0) {
      this.total += deposit;
      return this.constructor.formatDesc('押金', deposit);
    }
    return null;
  }

  getCouponDesc() {
    const { couponOffset } = this.reservation;
    if (couponOffset > 0) {
      this.total -= couponOffset;
      return this.constructor.formatDesc('折價券', couponOffset);
    }
    return null;
  }

  getDiscountDesc() {
    const { discounts, price } = this.itemDetail;
    const { startDate, endDate } = this.reservation;

    if (!discounts || !startDate || !endDate) return null;

    let discountMatch = null;
    discounts.forEach((discount) => {
      if (rangeDiff(startDate, endDate, true) >= discount.param) {
        discountMatch = discount;
      }
    });

    if (discountMatch) {
      const discountTotal = this.days * this.amount * (price - discountMatch.discount);
      this.total -= discountTotal;
      return this.constructor.formatDesc(
        `租滿${discountMatch.param}天，折抵金額`,
        discountTotal,
      );
    }
    return null;
  }
}
