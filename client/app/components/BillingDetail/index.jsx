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
    return (
      <div
        styleName="detail-container"
        className="clear"
      >
        <span styleName="label">
          {text}
        </span>
        <span styleName="price">
          <span styleName="high-light">
            {formatCurrency(amount, '')}
          </span>
        </span>
      </div>
    );
  }

  static renderDiscount(price, discount) {
    return (
      <div
        styleName="detail-container"
        className="clear"
      >
        <span styleName="label">
          <span styleName="abandon">
            {price.text}
          </span>
          <span>
            &nbsp;{discount.text}
          </span>
        </span>
        <span styleName="price">
          <span styleName="abandon">
            {formatCurrency(price.amount, '')}
          </span>
          <span styleName="high-light">
            &nbsp;{formatCurrency(discount.amount, '')}
          </span>
        </span>
      </div>
    );
  }

  static renderDetail({ text, amount }, isDiscounted) {
    return (
      <div
        styleName="detail-container"
        className="clear"
      >
        <span styleName="label">
          <span>{text}</span>
        </span>
        <span className={cx('price', { discounted: isDiscounted })}>
          <span>{formatCurrency(amount, '')}</span>
        </span>
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


  render() {
    const {
      priceDetail,
      depositDetail,
      couponDetail,
      discountDetail,
      total,
    } = this.props;

    const {
      renderPrice,
      renderDiscount,
      renderDetail,
    } = this.constructor;

    return (
      <Container >
        {discountDetail ?
          renderDiscount(priceDetail, discountDetail) :
          renderPrice(priceDetail)
        }
        {depositDetail && renderDetail(depositDetail)}
        {couponDetail && renderDetail(couponDetail, true)}
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
