import { connect } from 'react-redux';

import WishList from '../components/WishList';
import { fetchRecords, reset } from '../modules/userprofileWishList';

/* pick props */
const mapStateToProps = ({ environment, userprofileWishList }) => ({
  environment, userprofileWishList,
});

/* pick dispatch */
const mapDispatchToProps = (dispatch, { params }) => ({
  dispatchFetchRecords: () => dispatch(fetchRecords(params.uid)),
  dispatchReset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WishList);