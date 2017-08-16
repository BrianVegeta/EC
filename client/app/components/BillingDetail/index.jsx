import React from 'react';
import PropTypes from 'prop-types';

import { formatCurrency } from 'lib/currency';

import Detail from './Detail';
import {
  Container,
  ConclusionDetail,
  ConclusionLabel,
  ConclusionPrice,
} from './styles';


const detailPropType = PropTypes.shape({
  text: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
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

  render() {
    const {
      priceDetail,
      depositDetail,
      couponDetail,
      discountDetail,
      total,
    } = this.props;

    return (
      <Container >
        <Detail data={priceDetail} />
        {depositDetail && <Detail data={depositDetail} />}
        {couponDetail && <Detail data={couponDetail} extra />}
        {discountDetail && <Detail data={discountDetail} extra />}
        <ConclusionDetail className="clear">
          <ConclusionLabel highlight>總計</ConclusionLabel>
          <ConclusionPrice highlight>{formatCurrency(total)}</ConclusionPrice>
        </ConclusionDetail>
      </Container>
    );
  }
}

export default BillingDetail;
