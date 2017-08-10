import { connect } from 'react-redux';
import MyAccount from '../components/MyAccount';


const mapStateToProps = ({ environment, auth }) => ({
  environment, currentUser: auth.currentUser,
});
export default connect(mapStateToProps)(MyAccount);
