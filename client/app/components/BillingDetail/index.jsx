import React from 'react';
import PropTypes from 'prop-types';
import {
  isEqual,
} from 'lodash';

import { formatCurrency } from 'lib/currency';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import {
  Container,
  ConclusionDetail,
  ConclusionLabel,
  ConclusionPrice,
} from './styles';
import calculateService from './calculateService';

const cx = classnames.bind(styles);
const detailPropType = PropTypes.shape({
  text: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
});

class BillingDetail extends React.Component {

  static defaultProps = {
    priceDetail: null,
    depositDetail: null,
    couponDetail: null,
    discountDetail: null,
  };

  static propTypes = {
    priceDetail: detailPropType,
    depositDetail: detailPropType,
    couponDetail: detailPropType,
    discountDetail: detailPropType,
    total: PropTypes.number.isRequired,
  };

  static renderPrice({ text, amount }) {
    const currency = formatCurrency(amount, '');
    return (
      <div className={`clear ${cx('detail-container')}`} >
        <span styleName="label">{text}</span>
        <span styleName="price">
          <span styleName="high-light">{currency}</span>
        </span>
      </div>
    );
  }

  static renderDiscount(price, discount) {
    const priceCurrency = formatCurrency(price.amount, '');
    const discountCurrency = formatCurrency(discount.amount, '');
    return (
      <div className={`clear ${cx('detail-container')}`}>
        <span styleName="label">
          <span styleName="abandon">{price.text}</span>
          <span>&nbsp;{discount.text}</span>
        </span>
        <span styleName="price">
          <span styleName="abandon">{priceCurrency}</span>
          <span styleName="high-light">&nbsp;{discountCurrency}</span>
        </span>
      </div>
    );
  }

  static renderDetail({ text, amount }, discounted = false) {
    const currency = formatCurrency(amount, '');
    return (
      <div className={`clear ${cx('detail-container')}`}>
        <span styleName="label">{text}</span>
        <span className={cx('price', { discounted })}>{currency}</span>
      </div>
    );
  }

  shouldComponentUpdate(nextProps) {
    const {
      priceDetail,
      depositDetail,
      couponDetail,
      discountDetail,
      total,
    } = this.props;
    const beenPriceChanged = !isEqual(priceDetail, nextProps.priceDetail);
    const beenDepositChanged = !isEqual(depositDetail, nextProps.depositDetail);
    const beenCouponChanged = !isEqual(couponDetail, nextProps.couponDetail);
    const beenDiscountChanged = !isEqual(discountDetail, nextProps.discountDetail);
    const beenTotalChanged = !isEqual(total, nextProps.total);
    if (beenPriceChanged) return true;
    if (beenDepositChanged) return true;
    if (beenCouponChanged) return true;
    if (beenDiscountChanged) return true;
    if (beenTotalChanged) return true;
    return false;
  }

  renderPriceWithDiscounts({ priceDetail, discountDetail }) {
    const { renderDiscount, renderPrice } = this.constructor;
    if (discountDetail) return renderDiscount(priceDetail, discountDetail);
    return renderPrice(priceDetail);
  }

  renderDeposit({ depositDetail }) {
    if (!depositDetail) return null;
    return this.constructor.renderDetail(depositDetail);
  }

  renderCoupon({ couponDetail }) {
    if (!couponDetail) return null;
    const isDiscounted = true;
    return this.constructor.renderDetail(couponDetail, isDiscounted);
  }

  render() {
    const { total } = this.props;
    return (
      <Container >
        {this.renderPriceWithDiscounts(this.props)}
        {this.renderDeposit(this.props)}
        {this.renderCoupon(this.props)}
        <ConclusionDetail className="clear">
          <ConclusionLabel highlight>總計</ConclusionLabel>
          <ConclusionPrice highlight>{formatCurrency(total, 'NTD ')}</ConclusionPrice>
        </ConclusionDetail>
      </Container>
    );
  }
}

export {
  calculateService,
};
export default CSS(BillingDetail, styles);
