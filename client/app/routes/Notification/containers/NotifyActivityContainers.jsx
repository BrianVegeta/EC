import { connect } from 'react-redux';

import Container from '../components/notifyActivity';

const mapStateToProps = ({ environment }) => ({
  environment,
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
