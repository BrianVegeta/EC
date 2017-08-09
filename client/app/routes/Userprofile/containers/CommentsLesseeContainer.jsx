import { connect } from 'react-redux';

import Comments from '../components/Comments';
import { TARGET_LESSEE, fetchRecords, reset } from '../modules/userprofileComments';

/* pick props */
const mapStateToProps = ({ environment, userprofileComments }) => ({
  environment, userprofileComments,
});

/* pick dispatch */
const mapDispatchToProps = (dispatch, { params }) => ({
  dispatchRecords: () => dispatch(fetchRecords(params.uid, TARGET_LESSEE)),
  dispatchReset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
