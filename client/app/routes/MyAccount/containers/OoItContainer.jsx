import { connect } from 'react-redux';
import OoIt from '../components/OwnerOrder/OoIt';
import { ROLE_OWNER, TYPE_ITEM, fetchRecords, reset } from '../modules/myOrder';


const mapStateToProps = ({ environment, myOrder, auth }, { params }) => ({
  environment, myOrder, currentUser: auth.currentUser, tabName: params.tabName,
});
/* pick dispatch */
const mapDispatchToProps = (dispatch, { params }) => ({
  dispatch,
  dispatchRecords: () => dispatch(fetchRecords(ROLE_OWNER, TYPE_ITEM, params.tabName)),
  test: () => console.log(`params: ${params.tabName}`),
  dispatchReset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OoIt);
