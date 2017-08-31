import { connect } from 'react-redux';
import { popupShowWish } from 'modules/popup';

import WishList from '../components/Wish';
import { fetchRecords, reset } from '../modules/myWish';

/* pick props */
const mapStateToProps = ({ environment, myWish }) => ({
  environment, myWish,
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatchFetchRecords: () => dispatch(fetchRecords()),
  dispatchReset: () => dispatch(reset()),
  dispatchShow: options => dispatch(popupShowWish(options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WishList);
