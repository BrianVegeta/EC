import { connect } from 'react-redux';
import { logout } from 'modules/auth';
import { popupPublishEntry } from 'modules/popup';

import Component from './index';


/* pick props */
const mapStateToProps = ({ environment, auth, notification }, props) => ({
  environment,
  auth,
  notification,
  ...props,
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatchLogout: () => {
    dispatch(logout());
  },
  dispatchPublish: () => dispatch(popupPublishEntry()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
