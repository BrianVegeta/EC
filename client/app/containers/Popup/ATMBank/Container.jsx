import { connect } from 'react-redux';
import Component from './index';

/* pick props */
const mapStateToProps = (environment, popup) => ({
  environment, popup,
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
