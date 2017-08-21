import { connect } from 'react-redux';
import {
  fetchBanks,
  fetchBranchs,
} from 'modules/banks';
import {
  fetchInfo,
  changeInfo,
  changePassword,
  reset as resetBankInfo,
} from 'modules/personalBankInfo';
import Component from './index';

/* pick props */
const mapStateToProps = ({ environment, banks, personalBankInfo }, { password }) => ({
  environment,
  banks,
  personalBankInfo,
  isReadyToRender: (banks.length > 0 && personalBankInfo.isChecked),
  checkedPassword: password,
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatchFetchBanks: () => dispatch(fetchBanks()),
  dispatchFetchBranchs: bankId => dispatch(fetchBranchs(bankId)),

  dispatchFetchBankInfo: () => dispatch(fetchInfo()),
  dispatchResetBankInfo: () => dispatch(resetBankInfo()),
  dispatchChangeInfo: data => dispatch(changeInfo(data)),
  dispatchChangePassword: password => dispatch(changePassword(password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
