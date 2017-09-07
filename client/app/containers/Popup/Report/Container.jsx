import { connect } from 'react-redux';
import { sendReport } from 'modules/report';
import { closeCallback } from 'modules/popup';
import Component from './index';

/* pick props */
const mapStateToProps = (environment, popup) => ({
  environment, popup,
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatchReport: (pid, reason) => dispatch(sendReport(pid, reason)),
  dispatchClose: () => dispatch(closeCallback()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
