import { connect } from 'react-redux';
import LoSe from '../components/LesseeOrder/LoSe';
import { ROLE_LESSEE, TYPE_SERVICE, fetchRecords, reset } from '../modules/myOrder';


const mapStateToProps = ({ environment, myOrder, auth }, { params }) => ({
  environment, myOrder, currentUser: auth.currentUser, tabName: params.tabName,
});
/* pick dispatch */
const mapDispatchToProps = (dispatch, { params }) => ({
  dispatch,
  dispatchRecords: () => dispatch(fetchRecords(ROLE_LESSEE, TYPE_SERVICE, params.tabName)),
  dispatchReset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoSe);
