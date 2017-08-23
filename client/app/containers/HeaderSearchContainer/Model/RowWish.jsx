import _ from 'lodash';
import numeral from 'numeral';
// import {
//   searchByName,
// } from '../../../actions/searchActions';

export default class {
  static handleNullAtrr(attr) {
    return _.isNull(attr) || _.isEqual(attr, '') || _.isUndefined(attr) ? '' : attr;
  }
  constructor(wish, dispatch) {
    this.dispatch = dispatch;
    this.title = wish.pname;

    const { handleNullAtrr } = this.constructor;
    this.id = wish.id;
    this.picture = handleNullAtrr(wish.picture);
    this.pictureBg = _.isEqual(this.picture, '') ? null : `url(${this.picture})`;
    this.priceLabel = `預算 NT${numeral(wish.expprice).format('$0,000')}`;
  }
}
