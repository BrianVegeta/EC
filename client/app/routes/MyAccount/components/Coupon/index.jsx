import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import CouponCard from './CouponCard';
import Container from '../Container';

class CouponsContainer extends React.Component {
  static propTypes = {
    myCoupon: PropTypes.shape({
      records: PropTypes.array.isRequired,
    }).isRequired,
  };

  render() {
    const { myCoupon } = this.props;
    const { records } = myCoupon;
    return (
      <Container titleText={'優惠卷'}>
        { (records.length === 0) ?
          <div style={{ marginTop: '30%',
            fontSize: '40',
            fontWeight: 600 }}
          >目前沒有優惠卷
          </div>
          : records.map(couponItem => (
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
export default CSS(CouponsContainer, styles);
