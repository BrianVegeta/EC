import { connect } from 'react-redux';

import Userprofile from '../components/Userprofile';
import { fetchUser } from '../modules/userprofile';

/* pick props */
const mapStateToProps = ({ environment, userprofile }) => ({
  environment, userprofile,
});

/* pick dispatch */
const mapDispatchToProps = (dispatch, { params }) => ({
  dispatchFetchUser: () => dispatch(fetchUser(params.uid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Userprofile);
