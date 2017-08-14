import { connect } from 'react-redux';

import Wallet from '../components/Wallet';
import { TYPE_IN, fetchRecords, reset } from '../modules/myWallet';

/* pick props */
const mapStateToProps = ({ environment, myWallet }) => ({
  environment, myWallet, type: TYPE_IN,
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatchFetchRecords: (startDate, endDate) =>
  dispatch(fetchRecords(TYPE_IN, startDate, endDate)),
  dispatchReset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
