import { connect } from 'react-redux';
import Userprofile from '../components/Userprofile';

const mapStateToProps = ({ environment, userprofile }) => ({
  environment, userprofile,
});

export default connect(mapStateToProps)(Userprofile);
