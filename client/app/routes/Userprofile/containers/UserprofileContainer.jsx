import { connect } from 'react-redux';

import Userprofile from '../components/Userprofile';
import { fetchUser, addToTrack, removeFromTrack } from '../modules/userprofile';

/* pick props */
const mapStateToProps = ({ environment, userprofile, auth }) => ({
  environment,
  userprofile,
  isLogin: auth.isLogin,
  currentUid: auth.currentUser.uid,
});

/* pick dispatch */
const mapDispatchToProps = (dispatch, { params }) => ({
  dispatchFetchUser: () => dispatch(fetchUser(params.uid)),
  dispatchAddTrack: () => dispatch(addToTrack(params.uid)),
  dispatchRemoveTrack: () => dispatch(removeFromTrack(params.uid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Userprofile);
