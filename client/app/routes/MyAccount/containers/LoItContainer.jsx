import { connect } from 'react-redux';
import LoIt from '../components/LesseeOrder/LoIt';
import { ROLE_LESSEE, TYPE_ITEM, fetchRecords, reset, checkUnreadCount } from '../modules/myOrder';

const mapStateToProps = ({ environment, myOrder, auth }, { params }) => ({
  environment, myOrder, currentUser: auth.currentUser, tabName: params.tabName,
});
/* pick dispatch */
const mapDispatchToProps = (dispatch, { params }) => ({
  dispatch,
  dispatchUnreadCount: () => dispatch(checkUnreadCount({ isOwnerPage: false })),
  dispatchRecords: () => dispatch(fetchRecords(ROLE_LESSEE, TYPE_ITEM, params.tabName)),
  dispatchReset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoIt);
