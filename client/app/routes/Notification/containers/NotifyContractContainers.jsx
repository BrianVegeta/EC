import { connect } from 'react-redux';

import Container from '../components/notifyContract';
import { fetchUnreadCount, TYPE_CONTRACT } from '../modules/notification';

const mapStateToProps = ({ environment, notify }) => ({
  environment, notify,
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatchUnreadCount: () => dispatch(fetchUnreadCount(TYPE_CONTRACT)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
