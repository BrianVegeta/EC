import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import _ from 'lodash';
import styles from './styles.sass';
import NewDiscountBtn from './NewDiscountBtn';
import DiscountRule from './DiscountRule';
import AlertPanel from '../AlertPanel';

const defaultDiscount = {
  days: 5,
  offer: 95,
};
const DISCOUNT_MAX = 3;
class DiscountGroup extends React.Component {
  constructor(props) {
    super(props);
    this.onNew = this.onNew.bind(this);
    this.state = { discounts: [] };
  }
  onNew() {
    const discounts = this.state.discounts.concat();
    if (discounts.length >= DISCOUNT_MAX) { return; }
    discounts.push(defaultDiscount);
    this.setState({ discounts });
  }
  changeDiscount(days, offer, index) {
    const discounts = this.state.discounts.concat();
    discounts[index] = Object.assign({}, discounts[index], { days, offer });
    this.setState({ discounts });
  }
  remove(index) {
    const discounts = this.state.discounts.concat();
    discounts.splice(index, 1);
    this.setState({ discounts });
  }
  isDiscountsDuplicate() {
    const { discounts } = this.state;
    const uniqs = _.uniqBy(discounts, 'offer');
    return uniqs.length !== discounts.length;
  }
  checkDuplicate() {
    this.setState({ isDuplicate: this.isDiscountsDuplicate() });
  }
  render() {
    const { discounts } = this.state;
    return (
      <div>
        {discounts.map((discount, i) =>
          <DiscountRule
            key={`${i + 1}`}
            days={discount.days}
            offer={discount.offer}
            onRemove={() => this.remove(i)}
            onChange={(days, offer) => this.changeDiscount(days, offer, i)}
            hasHeader={i === 0}
          />,
        )}
        <NewDiscountBtn onClick={this.onNew} disabled={discounts.length >= DISCOUNT_MAX} />
        {this.isDiscountsDuplicate() && <AlertPanel message="重複的折扣組合" />}
      </div>
    );
  }
}

export default CSS(DiscountGroup, styles);
