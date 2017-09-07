import { connect } from 'react-redux';
import { popupShowWish } from 'modules/popup';
import WishList from '../components/WishList';
import { fetchRecords, reset } from '../modules/userprofileWishList';

/* pick props */
const mapStateToProps = ({ environment, userprofileWishList, auth }) => ({
  environment, userprofileWishList, isLogin: auth.isLogin,
});

/* pick dispatch */
const mapDispatchToProps = (dispatch, { params }) => ({
  dispatchFetchRecords: () => dispatch(fetchRecords(params.uid)),
  dispatchReset: () => dispatch(reset()),
  dispatchShow: options => dispatch(popupShowWish(options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WishList);
