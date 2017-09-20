import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import ListContainer from 'components/ListContainer';
import AcccountNav from 'constants/myAccountNavs';
import styles from './styles.sass';
import CouponCard from './CouponCard';
import Container from '../Container';

const titleName = AcccountNav.coupon.text;
class CouponsContainer extends React.Component {
  static propTypes = {
    myCoupon: PropTypes.shape({
      records: PropTypes.array.isRequired,
    }).isRequired,
    dispatchFetchItem: PropTypes.func.isRequired,
    dispatchReset: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.dispatchReset();
    this.props.dispatchFetchItem();
  }

  componentWillUnmount() {
    this.props.dispatchReset();
  }

  render() {
    const { myCoupon } = this.props;
    const { records } = myCoupon;
    const noRecords = (myCoupon.isFetching === false && records.length === 0);
    return (
      <Container titleText={titleName}>
        <ListContainer
          minHeight={500}
          noDataText={noRecords ? '目前沒有優惠券' : null}
          isInitialFetching={myCoupon.isFetching}
        >
          { records.map(couponItem => (
            <CouponCard
              key={couponItem.coupon_no}
              couponNo={couponItem.coupon_id}
              title={couponItem.name}
              discount={couponItem.amount}
              expireAt={couponItem.expiration_time}
            />
          ))}
        </ListContainer>
      </Container>
    );
  }
}
export default CSS(CouponsContainer, styles);
