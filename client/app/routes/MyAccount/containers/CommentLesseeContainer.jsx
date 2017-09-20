import { connect } from 'react-redux';

import Comment from '../components/Comment';
import { TARGET_LESSEE, fetchRecords, reset } from '../modules/myComment';

/* pick props */
const mapStateToProps = ({ environment, myComment, auth }) => ({
  environment, myComment, auth, isOwner: false,
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatchRecords: () => dispatch(fetchRecords(TARGET_LESSEE)),
  dispatchReset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
