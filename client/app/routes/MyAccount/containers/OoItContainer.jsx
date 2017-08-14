import { connect } from 'react-redux';
import OoIt from '../components/OwnerOrder/OoIt';
import { ROLE_OWNER, TYPE_ITEM, fetchRecords, reset } from '../modules/myWallet';


const mapStateToProps = ({ environment, auth }) => ({
  environment, currentUser: auth.currentUser,
});
/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatchFetchRecords: () => dispatch(fetchRecords(ROLE_OWNER, TYPE_ITEM)),
  dispatchReset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OoIt);
