import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import _ from 'lodash';
import styles from './styles.sass';
import NewDiscountBtn from './NewDiscountBtn';
import DiscountRule from './DiscountRule';
import AlertPanel from '../AlertPanel';

const defaultDiscount = {
  days: 5,
  offer: 100,
};
const DISCOUNT_MAX = 3;
class DiscountGroup extends React.Component {
  static isDuplicate(discounts) {
    const uniqs = _.uniqBy(discounts, 'offer');
    return uniqs.length !== discounts.length;
  }
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    discounts: PropTypes.arrayOf(PropTypes.object).isRequired,
    price: PropTypes.number.isRequired,
  };
  constructor(props) {
    super(props);
    this.onNew = this.onNew.bind(this);
    this.discounts = new Map();
  }
  onNew() {
    const discounts = this.props.discounts.concat();
    if (discounts.length >= DISCOUNT_MAX) { return; }
    discounts.push(defaultDiscount);
    this.props.onChange(discounts);
  }
  valid() {
    this.discounts.forEach(discount =>
      discount.valid(),
    );
  }
  changeDiscount(days, offer, index) {
    const discounts = this.props.discounts.concat();
    discounts[index] = Object.assign({}, discounts[index], { days, offer });
    this.props.onChange(discounts);
  }
  remove(index) {
    const discounts = this.props.discounts.concat();
    discounts.splice(index, 1);
    this.props.onChange(discounts);
  }
  isDiscountsDuplicate() {
    const { discounts } = this.props;
    const uniqs = _.uniqBy(discounts, 'offer');
    return uniqs.length !== discounts.length;
  }

  render() {
    const { discounts } = this.props;
    return (
      <div>
        {discounts.map((discount, i) =>
          <DiscountRule
            key={`${i + 1}`}
            ref={d => (this.discounts.set(i, d))}
            days={discount.days}
            offer={discount.offer}
            price={this.props.price}
            onRemove={() => this.remove(i)}
            onChange={(days, offer) => this.changeDiscount(days, offer, i)}
            hasHeader={i === 0}
          />,
        )}
        <NewDiscountBtn
          onClick={this.onNew}
          disabled={discounts.length >= DISCOUNT_MAX}
        />
        {this.constructor.isDuplicate(discounts) &&
          <AlertPanel message="重複的折扣組合" />
        }
      </div>
    );
  }
}

export default CSS(DiscountGroup, styles);
