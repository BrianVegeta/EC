import { connect } from 'react-redux';
import { popupShowWish } from 'modules/popup';

import WishingPond from '../components/WishingPond';
import {
  REDUCER_KEY as WISH_REDUCER_KEY,
  fetchRecords,
  reset,
} from '../modules/wish';

/* pick dispatch */
const mapStateToProps = ({ environment, [WISH_REDUCER_KEY]: wish }) => ({
  environment,
  wish,
});
/* pick dispatch */

const mapDispatchToProps = dispatch => ({
  dispatchFetchRecords: () => dispatch(fetchRecords()),
  dispatchReset: () => dispatch(reset()),
  dispatchShow: options => dispatch(popupShowWish(options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WishingPond);
