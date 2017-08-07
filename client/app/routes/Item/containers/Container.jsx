import { connect } from 'react-redux';

import Item from '../components/Item';

const mapStateToProps = ({ environment, item, auth }) => ({
  environment, item, auth,
});
export default connect(mapStateToProps)(Item);
