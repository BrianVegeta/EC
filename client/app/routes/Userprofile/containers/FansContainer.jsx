import { connect } from 'react-redux';
import { TRACK_ME, fetchRecords, reset } from '../modules/userprofileTrack';
import Track from '../components/Track';

/* pick props */
const mapStateToProps = ({ environment, userprofileTrack, auth }) => ({
  environment, userprofileTrack, isLogin: auth.isLogin, type: TRACK_ME,
});

/* pick dispatch */
const mapDispatchToProps = (dispatch, { params }) => ({
  dispatchFetchRecords: () => dispatch(fetchRecords(params.uid, TRACK_ME)),
  dispatchRemoveTrack: () => {},
  dispatchReset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Track);
