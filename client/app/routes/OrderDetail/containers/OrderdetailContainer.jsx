import { connect } from 'react-redux';
import Orderdetail from '../components/Orderdetail';

const mapStateToProps = ({ environment, orderdetail }) => ({
  environment, orderdetail,
});

export default connect(mapStateToProps)(Orderdetail);
