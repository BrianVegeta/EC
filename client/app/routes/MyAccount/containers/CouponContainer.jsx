import { connect } from 'react-redux';
import { popupLogin } from 'modules/popup';
import Container from '../components/Coupon';
import { fetchCoupon, reset } from '../modules/myCoupon';

const mapStateToProps = (state) => {
  const { environment, myCoupon } = state;
  return ({ environment, myCoupon });
};

const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatchFetchItem: () => dispatch(fetchCoupon()),
  dispatchReset: () => dispatch(reset()),
  dispatchPopLogin: () => dispatch(popupLogin({
    onAfterLogin: () => console.log('onCheck Called'),
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
