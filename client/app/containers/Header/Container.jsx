import { connect } from 'react-redux';
import { logout } from 'modules/auth';
import { popupPublishEntry } from 'modules/popup';
import { getNotitications } from 'modules/notification';
import Component from './index';

/* pick props */
const mapStateToProps = ({
  environment,
  auth,
  notification,
  routing: { locationBeforeTransitions },
}) => ({
  environment,
  auth,
  notification,
  pathname: locationBeforeTransitions.pathname,
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatchLogout: () => dispatch(logout()),
  dispatchPublish: () => dispatch(popupPublishEntry()),
  dispatchNotify: () => dispatch(getNotitications()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
