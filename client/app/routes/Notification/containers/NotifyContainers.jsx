import { connect } from 'react-redux';
// import { getNotitications } from 'modules/notification';
import Notify from '../components/Notify';


const mapStateToProps = ({ environment, auth }) => ({
  environment, currentUser: auth.currentUser,
});

export default connect(mapStateToProps)(Notify);
