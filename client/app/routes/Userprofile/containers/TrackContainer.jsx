import { connect } from 'react-redux';
import { ME_TRACK, fetchRecords, removeTrack, reset } from '../modules/userprofileTrack';
import Track from '../components/Track';

/* pick props */
const mapStateToProps = ({ environment, userprofileTrack, auth }) => ({
  environment, userprofileTrack, isLogin: auth.isLogin, type: ME_TRACK,
});

/* pick dispatch */
const mapDispatchToProps = (dispatch, { params }) => ({
  dispatchFetchRecords: () => dispatch(fetchRecords(params.uid, ME_TRACK)),
  dispatchRemoveTrack: targetUid => dispatch(removeTrack(targetUid, params.uid)),
  dispatchReset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Track);
