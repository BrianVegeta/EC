import { connect } from 'react-redux';

import Container from '../components/NotifySystem';
import { fetchUnreadCount, fetchMoreData, reset, TYPE_SYSTEM } from '../modules/notification';

const mapStateToProps = ({ environment, notify }) => ({
  environment, notify,
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatchUnreadCount: () => dispatch(fetchUnreadCount(TYPE_SYSTEM)),
  dispatchReset: () => dispatch(reset()),
  dispatchMore: () => dispatch(fetchMoreData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
