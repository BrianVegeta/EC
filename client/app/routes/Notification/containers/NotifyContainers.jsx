import { connect } from 'react-redux';
import Notify from '../components/Notify';


const mapStateToProps = ({ environment, auth }) => ({
  environment, currentUser: auth.currentUser,
});
export default connect(mapStateToProps)(Notify);
