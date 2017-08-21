import React from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';

import FormBlock from 'components/Form/Block';
import InputText from 'components/Input/Text';
import InputSelection from 'components/Input/Selection';
import InputPassword from 'components/Input/Password';
import FormButton from 'components/FormButton';

// import ModelPopupBankSetup from 'models/PopupBankSetup';
import ConfirmUpdatePhoneContainer from 'containers/ConfirmUpdate/PhoneContainer';
import ConfirmUpdateEmailContainer from 'containers/ConfirmUpdate/EmailContainer';

import constraints from 'constraints';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class BankSetupContainer extends React.Component {

  static propTypes = {
    banks: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.string }),
    ).isRequired,
    personalBankInfo: PropTypes.shape({
      isChecked: PropTypes.bool,
      isReady: PropTypes.bool,
      info: PropTypes.object,
      password: PropTypes.string.isRequired,
    }).isRequired,
    isReadyToRender: PropTypes.bool.isRequired,
    checkedPassword: PropTypes.string.isRequired,

    dispatchFetchBanks: PropTypes.func.isRequired,
    dispatchFetchBranchs: PropTypes.func.isRequired,
    dispatchFetchBankInfo: PropTypes.func.isRequired,
    dispatchResetBankInfo: PropTypes.func.isRequired,
    dispatchChangeInfo: PropTypes.func.isRequired,
    dispatchChangePassword: PropTypes.func.isRequired,
  };

  static generateBranchOptions(accBankId, banks) {
    if (!accBankId) return [];
    const findBank = find(banks, { id: accBankId });
    if (!findBank) return [];
    const { branchs } = findBank;
    if (!branchs) return [];
    return branchs.map(({ id: value, branchName: text }) => ({
      value, text,
    }));
  }

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onBankSelect = this.onBankSelect.bind(this);
    this.onBranchSelect = this.onBranchSelect.bind(this);
  }

  componentDidMount() {
    // bank options
    this.props.dispatchFetchBanks();
    this.props.dispatchFetchBankInfo();
  }

  componentWillUnmount() {
    this.props.dispatchResetBankInfo();
  }

  onSubmit() {
    console.log('submit');
  }

  onBankSelect({ value: accBankId, text: accBankName }) {
    const { dispatchFetchBranchs, dispatchChangeInfo } = this.props;
    dispatchChangeInfo({ accBankId, accBankName });
    dispatchFetchBranchs(accBankId);
  }

  onBranchSelect({ value: accBankBranchId, text: accBankBranchName }) {
    this.props.dispatchChangeInfo({ accBankBranchId, accBankBranchName });
  }

  changeInfo(key) {
    return value => this.props.dispatchChangeInfo({ [key]: value });
  }

  render() {
    const {
      banks,
      personalBankInfo,
      dispatchChangePassword,
      isReadyToRender,
      checkedPassword,
    } = this.props;

    const {
      info: {
        realName,
        idNumber,
        phone,
        email,
        accBankId,
        accBankBranchId,
        accName,
        accNo,
      },
      password,
    } = personalBankInfo;

    if (!isReadyToRender) return null;

    const bankOptions = banks.map(({ id, bankName }) =>
      ({ value: id, text: bankName }),
    );
    const branchOptions = this.constructor.generateBranchOptions(accBankId, banks);

    return (
      <div styleName="container">
        <div styleName="header">設定銀行帳戶</div>
        <div styleName="body">
          <p styleName="warning">您填寫的資訊必須與身分證一致，以利銀行核對，否則將會影響日後撥款權益。</p>
          <FormBlock title="基本資料" hasBottomLine={false}>
            <div styleName="nameFormControl">
              <InputText
                placeholder="真實姓名"
                value={realName}
                onChange={this.changeInfo('realName')}
                constraints={constraints.realName}
              />
            </div>
            <div styleName="idFormControl">
              <InputText
                placeholder="身分證字號/統編"
                value={idNumber}
                onChange={this.changeInfo('idNumber')}
                constraints={constraints.idNumber}
              />
            </div>
          </FormBlock>
          <ConfirmUpdatePhoneContainer
            value={phone}
            password={checkedPassword}
            afterUpdateConfirm={this.changeInfo('phone')}
          />
          <ConfirmUpdateEmailContainer
            value={email}
            password={checkedPassword}
            afterUpdateConfirm={this.changeInfo('email')}
          />
          <FormBlock title="銀行帳戶資訊" hasBottomLine={false}>
            <div styleName="formControl">
              <InputSelection
                placeholder="選擇銀行"
                dropdownMaxHeight={250}
                value={accBankId}
                options={bankOptions}
                onSelect={this.onBankSelect}
                containers={constraints.accBankId}
              />
            </div>
            <div styleName="formControl">
              <InputSelection
                placeholder="選擇分行"
                dropdownMaxHeight={250}
                value={accBankBranchId}
                options={branchOptions}
                onSelect={this.onBranchSelect}
                constraints={constraints.accBankBranchId}
                disabled={branchOptions.length === 0}
              />
            </div>
            <div styleName="formControl">
              <InputText
                placeholder="戶名/公司名稱"
                value={accName}
                onChange={this.changeInfo('accName')}
                constraints={constraints.accName}
              />
            </div>
            <div styleName="formControl">
              <InputText
                placeholder="銀行帳號"
                value={accNo}
                onChange={this.changeInfo('accNo')}
                constraints={constraints.accNo}
              />
            </div>
          </FormBlock>
          <FormBlock title="密碼驗證" hasBottomLine={false}>
            <InputPassword
              placeholder="請輸入8個以上英數字"
              autoComplete="off"
              value={password}
              onChange={value => dispatchChangePassword(value)}
            />
            <div styleName="passwordCheckHelper">
              為了您的帳戶安全，請輸入密碼以協助我們確認您的身份
            </div>
          </FormBlock>
        </div>
        <div styleName="footer" className="clear">
          <span styleName="right">
            <FormButton
              width={170}
              colorType="orange"
              content="完成"
              onClick={this.onSubmit}
            />
          </span>
        </div>
      </div>
    );
  }
}

export default CSS(BankSetupContainer, styles);
