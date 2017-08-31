import { connect } from 'react-redux';
import {
  fetchBanks,
  fetchBranchs,
} from 'modules/banks';
import {
  fetchInfo,
  changeInfo,
  changeData,
  resetBankInfo,
  validateInfo,
  saveBankInfo,
  asyncCheckReady,
} from 'modules/personalBankInfo';
import BankSetup from '../components/BankSetup';

/* pick props */
const mapStateToProps = ({ environment, banks, personalBankInfo }) => {
  const { isChecked, infoFetched } = personalBankInfo;
  return ({
    environment,
    banks,
    personalBankInfo,
    isReadyToRender: (banks.length > 0 && isChecked && infoFetched),
  });
};

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatchFetchBanks: () => dispatch(fetchBanks()),
  dispatchFetchBranchs: bankId => dispatch(fetchBranchs(bankId)),
  dispatchFetchBankInfo: () => dispatch(fetchInfo()),
  dispatchFetchCheckBankReady: () => dispatch(asyncCheckReady()),
  dispatchResetBankInfo: () => dispatch(resetBankInfo()),
  dispatchChangeInfo: data => dispatch(changeInfo(data)),
  dispatchChangeData: data => dispatch(changeData(data)),
  dispatchSaveBankInfo: () => dispatch(saveBankInfo()),
  dispatchValidate: () => dispatch(validateInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BankSetup);
