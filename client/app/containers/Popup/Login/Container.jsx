import { connect } from 'react-redux';

import Component from './index';


const mapStateToProps = ({ environment, auth }) => ({
  environment, auth
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
