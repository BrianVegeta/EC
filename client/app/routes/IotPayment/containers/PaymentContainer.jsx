import { connect } from 'react-redux';

import Component from '../components/Payment';
/* pick dispatch */
const mapStateToProps = ({ environment }) => ({
  environment,
});
/* pick dispatch */

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
