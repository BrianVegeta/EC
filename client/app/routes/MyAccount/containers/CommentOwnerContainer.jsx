import { connect } from 'react-redux';

import Comment from '../components/Comment';
import { TARGET_OWNER, fetchRecords, reset } from '../modules/myComment';

/* pick props */
const mapStateToProps = ({ environment, myComment, auth }) => ({
  environment, myComment, auth, isOwner: true,
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatchRecords: () => dispatch(fetchRecords(TARGET_OWNER)),
  dispatchReset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
