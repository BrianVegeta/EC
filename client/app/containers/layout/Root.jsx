import { connect } from 'react-redux';
import { setReferrerPath } from 'modules/routingHelper';
import Root from 'layouts/Root';


const mapStateToProps = ({ environment }) => ({ environment });

const mapDispatchToProps = (dispatch, { location }) => ({
  dispatchSetReferrerPath: () => dispatch(setReferrerPath(location)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
