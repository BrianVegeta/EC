import { calculateDatesBetween } from 'lib/time';

export default class {

  constructor(detail, reservation, dispatch) {

    console.log(detail);
    console.log(reservation);
    this.dispatch = dispatch;
    this.details = [];

    const { discounts } = detail;
    const {
      startDate,
      endDate,
    } = reservation;

    this.calcDiscount(discounts, startDate, endDate);
  }

  calcPriceDesc() {

  }

  calcDepositDesc() {

  }

  calcCouponDesc() {

  }

  calcDiscount(discounts, startDate, endDate) {
    console.log(calculateDatesBetween(startDate, endDate));
  }
}
