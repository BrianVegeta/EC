import { connect } from 'react-redux';

import { closePopup } from 'modules/popup';
import Component from './index';

const mapStateToProps = ({ environment }) => ({
  environment,
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatchClose: () => dispatch(closePopup()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
