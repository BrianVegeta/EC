export default class {

  static option(value, text) {
    return { value, text };
  }

  constructor(myCoupons, dispatch) {
    this.dispatch = dispatch;
    this.options = myCoupons;
  }
}
