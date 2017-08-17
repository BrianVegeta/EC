import { connect } from 'react-redux';

import { closePopup } from 'modules/popup';

import Component from './index';


const mapStateToProps = ({ environment }) => ({
  environment,
});

/* pick dispatch */
const mapDispatchToProps = (dispatch, { onScore }) => ({
  dispatch,
  dispatchClosePopup: () => dispatch(closePopup()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
