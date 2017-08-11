import { connect } from 'react-redux';

import Container from '../components/Coupon';
import { fetchCoupon, reset } from '../modules/myCoupon';

const mapStateToProps = (state) => {
  const { environment, myCoupon } = state;
  return ({ environment, myCoupon });
};

const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatchFetchItem: () => dispatch(fetchCoupon),
  dispatchReset: () => dispatch(reset),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
