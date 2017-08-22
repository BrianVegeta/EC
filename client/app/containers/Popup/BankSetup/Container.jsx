import { connect } from 'react-redux';
import {
  fetchBanks,
  fetchBranchs,
} from 'modules/banks';
import {
  fetchInfo,
  changeInfo,
  changeData,
  changePassword,
  resetBankInfo,
  validateInfo,
  saveBankInfo,
} from 'modules/personalBankInfo';
import {
  closePopup,
} from 'modules/popup';
import Component from './index';

/* pick props */
const mapStateToProps = ({ environment, banks, personalBankInfo }, { password }) => {
  const { isChecked, infoFetched } = personalBankInfo;
  return ({
    environment,
    banks,
    personalBankInfo,
    isReadyToRender: (banks.length > 0 && isChecked && infoFetched),
    checkedPassword: password,
  });
};

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatchFetchBanks: () => dispatch(fetchBanks()),
  dispatchFetchBranchs: bankId => dispatch(fetchBranchs(bankId)),

  dispatchFetchBankInfo: () => dispatch(fetchInfo()),
  dispatchResetBankInfo: () => dispatch(resetBankInfo()),
  dispatchChangeInfo: data => dispatch(changeInfo(data)),
  dispatchChangeData: data => dispatch(changeData(data)),
  dispatchChangePassword: password => dispatch(changePassword(password)),
  dispatchSaveBankInfo: () => dispatch(saveBankInfo()),
  dispatchValidate: () => dispatch(validateInfo()),

  dispatchClosePopup: () => dispatch(closePopup()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
