import { connect } from 'react-redux';
import ItemsGoods from '../components/ItemsGoods';

const mapStateToProps = ({ environment }) => ({
  environment,
});

export default connect(mapStateToProps)(ItemsGoods);
