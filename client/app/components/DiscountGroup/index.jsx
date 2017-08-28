import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import _ from 'lodash';
import styles from './styles.sass';
import NewDiscountBtn from './NewDiscountBtn';
import DiscountRule from './DiscountRule';
import AlertPanel from '../AlertPanel';

// const defaultDiscount = {
//   days: 5,
//   offer: 100,
// };
const DISCOUNT_MAX = 3;
class DiscountGroup extends React.Component {
  static isDuplicate(discounts) {
    const uniqs = _.uniqBy(discounts, 'param');
    return uniqs.length !== discounts.length;
  }
  static defaultProps = {
    unitStr: '天',
    unitMax: 30,
  }
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    discounts: PropTypes.arrayOf(PropTypes.object).isRequired,
    price: PropTypes.number.isRequired,
    unitStr: PropTypes.string,
    unitMax: PropTypes.number,
    defaultDiscountObj: PropTypes.shape({
      type: PropTypes.string.isRequired,
      param: PropTypes.number,
      discount: PropTypes.number,
    }).isRequired,
  };
  constructor(props) {
    super(props);
    this.onNew = this.onNew.bind(this);
    this.discounts = new Map();
  }
  onNew() {
    if (this.props.discounts >= DISCOUNT_MAX) { return; }
    const { defaultDiscountObj } = this.props;
    const discounts = this.props.discounts.concat(
      Object.assign({}, defaultDiscountObj));
  //  discounts.push(defaultDiscount);
    this.props.onChange({ discounts });
  }
  valid() {
    this.discounts.forEach(discount =>
      discount.valid(),
    );
  }
  changeDiscount(days, offer, index) {
    const discounts = this.props.discounts.concat();
    discounts[index] = Object.assign({}, discounts[index],
      { param: days, discount: offer ? parseInt(offer, 10) : null });
    this.props.onChange({ discounts });
  }
  remove(index) {
    const discounts = this.props.discounts.concat();
    discounts.splice(index, 1);
    this.props.onChange({ discounts });
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
            days={discount.param}
            offer={discount.discount}
            price={this.props.price}
            unitStr={this.props.unitStr}
            unitMax={this.props.unitMax}
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
