import { connect } from 'react-redux';

import PublishService from '../components/PublishService';

/* pick props */
const mapStateToProps = ({ environment, publish }, { location }) => ({
  environment, publish, currentPath: location.pathname,
});

export default connect(mapStateToProps)(PublishService);
