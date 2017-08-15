import { connect } from 'react-redux';
import OoSp from '../components/OwnerOrder/OoSp';
import { ROLE_OWNER, TYPE_SPACE, fetchRecords, reset } from '../modules/myOrder';


const mapStateToProps = ({ environment, myOrder, auth }, { params }) => ({
  environment, myOrder, currentUser: auth.currentUser, tabName: params.tabName,
});
/* pick dispatch */
const mapDispatchToProps = (dispatch, { params }) => ({
  dispatch,
  dispatchRecords: () => dispatch(fetchRecords(ROLE_OWNER, TYPE_SPACE, params.tabName)),
  dispatchReset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OoSp);
