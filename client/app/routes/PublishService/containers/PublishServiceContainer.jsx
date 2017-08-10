import { connect } from 'react-redux';

import PublishService from '../components/PublishService';

/* pick props */
const mapStateToProps = ({ environment, publish }) => ({
  environment, publish,
});

/* pick dispatch */
// const mapDispatchToProps = (dispatch, { params }) => ({
//   dispatchFetchUser: () => dispatch(fetchUser(params.uid)),
// });

export default connect(mapStateToProps)(PublishService);
