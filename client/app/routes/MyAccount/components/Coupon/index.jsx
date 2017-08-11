import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import ListContainer from 'components/ListContainer';
import styles from './styles.sass';
import CouponCard from './CouponCard';
import Container from '../Container';


class CouponsContainer extends React.Component {
  static propTypes = {
    myCoupon: PropTypes.shape({
      records: PropTypes.array.isRequired,
    }).isRequired,
    dispatchFetchItem: PropTypes.func.isRequired,
    dispatchReset: PropTypes.func.isRequired,
  };

  componentDidMount() {
    // const { mine, dispatch } = this.props;
    this.props.dispatchReset();
    this.props.dispatchFetchItem();
    // new Model(mine, dispatch).fetchItems();
  }

  componentWillUnmount() {
    this.props.dispatchReset();
  }

  render() {
    const { myCoupon } = this.props;
    const { records } = myCoupon;
    const noRecords = (myCoupon.isFetching === false && records.length === 0);
    return (
      <Container titleText={'優惠卷'}>
        <ListContainer
          minHeight={500}
          noDataText={noRecords ? '目前沒有優惠卷' : null}
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
