import _ from 'lodash';
import numeral from 'numeral';

export default class {
  static handleNullAtrr(attr) {
    return _.isNull(attr) || _.isEqual(attr, '') || _.isUndefined(attr) ? '' : attr;
  }
  constructor(item, dispatch) {
    this.dispatch = dispatch;
    this.title = item.pname;

    const { handleNullAtrr } = this.constructor;
    this.picture = handleNullAtrr(item.img1);
    this.pictureBg = _.isEqual(this.picture, '') ? null : `url(${this.picture})`;
    this.priceLabel = `NT${numeral(item.price).format('$0,000')}`;
  }
}
