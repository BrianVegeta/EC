/* eslint-disable camelcase */
import numeral from 'numeral';

export default class {
  constructor(props) {
    const {
      pname,
      currency,
      price,
      img1,
      favorite_count,
      owner_img,
      owner_name,
    } = props;
    this.pname = pname;
    this.currency = currency;
    this.price = price;
    this.priceDesc = `${currency}${numeral(price).format('$0,000')}`;
    this.img1 = img1;
    this.coverUrl = `url(${img1})`;
    this.favoriteCount = favorite_count;
    this.ownerImg = owner_img;
    this.avatarUrl = `url(${owner_img})`;
    this.ownerName = owner_name;
  }
}
