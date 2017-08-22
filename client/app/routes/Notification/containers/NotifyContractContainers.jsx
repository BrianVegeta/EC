import { connect } from 'react-redux';

import Container from '../components/NotifyContract';
import { fetchUnreadCount, fetchMoreData, reset, TYPE_CONTRACT } from '../modules/notification';

const mapStateToProps = ({ environment, notify }) => ({
  environment, notify,
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatchUnreadCount: () => dispatch(fetchUnreadCount(TYPE_CONTRACT)),
  dispatchReset: () => dispatch(reset()),
  dispatchMore: () => dispatch(fetchMoreData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
