import { connect } from 'react-redux';
import { ME_TRACK, fetchRecords, reset } from '../modules/userprofileTrack';
import Track from '../components/Track';

/* pick props */
const mapStateToProps = ({ environment, userprofileTrack, auth }) => ({
  environment, userprofileTrack, isLogin: auth.isLogin, type: ME_TRACK,
});

/* pick dispatch */
const mapDispatchToProps = (dispatch, { params }) => ({
  dispatchFetchRecords: () => dispatch(fetchRecords(params.uid, ME_TRACK)),
  dispatchReset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Track);
