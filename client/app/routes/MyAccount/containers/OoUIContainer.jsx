import { connect } from 'react-redux';
import Component from '../components/OwnerOrder/OoUI';
import { ROLE_OWNER, TYPE_USED_ITEM, fetchRecords, reset, checkUnreadCount } from '../modules/myOrder';

const mapStateToProps = ({ environment, myOrder, auth }, { params }) => ({
  environment, myOrder, currentUser: auth.currentUser, tabName: params.tabName,
});
/* pick dispatch */
const mapDispatchToProps = (dispatch, { params }) => ({
  dispatch,
  dispatchUnreadCount: () => dispatch(checkUnreadCount({ isOwnerPage: true })),
  dispatchRecords: () => dispatch(fetchRecords(ROLE_OWNER, TYPE_USED_ITEM, params.tabName)),
  dispatchReset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
