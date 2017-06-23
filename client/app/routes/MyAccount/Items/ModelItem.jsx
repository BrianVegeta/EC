import numeral from 'numeral';

export default class {
  constructor(item, dispatch) {
    this.coverSrc = item.img1 ? `url(${item.img1})` : null;
    this.title = item.pname;
    this.price = `NT${numeral(item.price).format('$0,000')}`;
    this.dispatch = dispatch;
  }
}
