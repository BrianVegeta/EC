import { connect } from 'react-redux';
import MyAccount from '../components/MyAccount';


const mapStateToProps = ({ environment, routing, auth }) => ({
  environment, routing, currentUser: auth.currentUser,
});
export default connect(mapStateToProps)(MyAccount);
