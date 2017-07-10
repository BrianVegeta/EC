import { changeCoupon } from 'actions/reservationActions';

export default class {

  static option(value, name, amount, expiredAt) {
    return { value, name, amount, expiredAt };
  }

  static coverToOptions(list) {
    return list.map((coupon) => {
      const {
        name,
        amount,
        coupon_no,
        expiration_time,
      } = coupon;
      return this.option(coupon_no, name, amount, expiration_time);
    });
  }

  constructor(myCoupons, input, dispatch) {
    this.dispatch = dispatch;
    this.value = input.couponNo;
    this.list = myCoupons.list;
    this.options = this.constructor.coverToOptions(this.list);

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(option) {
    const { value, amount } = option;
    this.dispatch(changeCoupon(value, amount));
  }
}
