import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import CSS from 'react-css-modules';
import styles from './styles.sass';
import CouponCard from './CouponCard';
import Container from '../components/Container';

class CouponsContainer extends React.Component {
  static propTypes = {
    coupon: PropTypes.shape({
      records: PropTypes.array.isRequired,
    }).isRequired,
  };

  render() {
    const { coupon } = this.props;
    return (
      <Container titleText={'優惠卷'}>
        {coupon.records.map(couponItem => (
          <CouponCard
            key={couponItem.coupon_no}
            couponNo={couponItem.coupon_id}
            title={couponItem.name}
            discount={couponItem.amount}
            expireAt={couponItem.expiration_time}
          />
        ))}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, coupon } = state;
  return ({ environment, coupon });
};
export default connect(mapStateToProps)(CSS(CouponsContainer, styles));
