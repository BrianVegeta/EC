import numeral from 'numeral';

export default class {
  constructor(item, dispatch) {
    this.dispatch = dispatch;

    const {
      pname,
      pid,
      img1,
      price,
    } = item;

    this.pid = pid;
    this.title = pname;
    this.picture = img1;
    this.priceLabel = `NT${numeral(price).format('$0,000')}`;
  }
}
