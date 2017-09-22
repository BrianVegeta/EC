import { connect } from 'react-redux';
import MyAccount from '../components/MyAccount';


const mapStateToProps = ({
  environment,
  routing,
  auth,
  routing: { locationBeforeTransitions } }) => ({
    environment,
    routing,
    currentUser: auth.currentUser,
    pathname: locationBeforeTransitions.pathname,
  });
export default connect(mapStateToProps)(MyAccount);
