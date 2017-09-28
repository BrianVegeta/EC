import { connect } from 'react-redux';
import LoSp from '../components/LesseeOrder/LoSp';
import { ROLE_LESSEE, TYPE_SPACE, fetchRecords, reset, checkUnreadCount } from '../modules/myOrder';

const mapStateToProps = ({ environment, myOrder, auth }, { params }) => ({
  environment, myOrder, currentUser: auth.currentUser, tabName: params.tabName,
});
/* pick dispatch */
const mapDispatchToProps = (dispatch, { params }) => ({
  dispatch,
  dispatchUnreadCount: () => dispatch(checkUnreadCount({ isOwnerPage: false })),
  dispatchRecords: () => dispatch(fetchRecords(ROLE_LESSEE, TYPE_SPACE, params.tabName)),
  dispatchReset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoSp);
