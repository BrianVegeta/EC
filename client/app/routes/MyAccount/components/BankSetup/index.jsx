import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import { find } from 'lodash';
import AcccountNav from 'constants/myAccountNavs';
import FormBlock from 'components/Form/Block';
import InputText from 'components/Input/Text';
import InputSelection from 'components/Input/Selection';
import FormButton from 'components/FormButton';
import constraints from 'constraints';
import swal, { successConfig, warningConfig } from 'lib/swal';

import CSS from 'react-css-modules';
import styles from './styles.sass';
import Container from '../Container';

const titleName = AcccountNav.bankSetUp.text;
class BankSetupContainer extends React.Component {

  static propTypes = {
    banks: myPropTypes.banks.isRequired,
    personalBankInfo: myPropTypes.personalBankInfo.isRequired,
    isReadyToRender: PropTypes.bool.isRequired,

    dispatchFetchBanks: PropTypes.func.isRequired,
    dispatchFetchBranchs: PropTypes.func.isRequired,
    dispatchFetchBankInfo: PropTypes.func.isRequired,
    dispatchFetchCheckBankReady: PropTypes.func.isRequired,
    dispatchResetBankInfo: PropTypes.func.isRequired,
    dispatchChangeInfo: PropTypes.func.isRequired,
    dispatchChangeData: PropTypes.func.isRequired,
    dispatchSaveBankInfo: PropTypes.func.isRequired,
    dispatchValidate: PropTypes.func.isRequired,
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
    this.props.dispatchResetBankInfo();
    this.props.dispatchFetchBanks();
    this.props.dispatchFetchBankInfo();
    this.props.dispatchFetchCheckBankReady();
  }

  componentDidUpdate(prevProps) {
    const {
      isReadyToRender,
      dispatchFetchBranchs,
    } = this.props;

    if (isReadyToRender && !prevProps.isReadyToRender) {
      const { info: { accBankId } } = this.props.personalBankInfo;
      if (accBankId) dispatchFetchBranchs(accBankId);
    }
  }

  componentWillUnmount() {
    this.props.dispatchResetBankInfo();
  }

  onSubmit() {
    const {
      dispatchChangeData,
      dispatchValidate,
      dispatchSaveBankInfo,
    } = this.props;
    dispatchValidate().then(() => {
      dispatchSaveBankInfo().then(({ bankName }) => {
        dispatchChangeData({ bankName, isReady: true });
        swal(successConfig({ title: '收款設定成功', text: '收款設定已編輯成功' }));
      });
    }).catch(() => {
      swal(warningConfig({ title: '請檢查所填寫的資料', text: '請先檢查資料格式。' }));
      this.realNameInput.valid();
      this.idNumberInput.valid();
      this.accBankInput.valid();
      if (!this.accBankBranchInput.props.disabled) {
        this.accBankBranchInput.valid();
      }
      this.accNameInput.valid();
      this.accNoInput.valid();
    });
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
      isReadyToRender,
    } = this.props;

    const {
      info: {
        realName,
        idNumber,
        accBankId,
        accBankBranchId,
        accName,
        accNo,
      },
    } = personalBankInfo;
    if (!isReadyToRender) return null;
    const bankOptions = banks.map(({ id, bankName }) =>
      ({ value: id, text: bankName }),
    );
    const branchOptions = this.constructor.generateBranchOptions(accBankId, banks);
    return (
      <Container titleText={titleName} >
        <div styleName="form-container">
          <p styleName="warning">您填寫的資訊必須與身分證一致，以利銀行核對，否則將會影響日後撥款權益。</p>
          <FormBlock title="基本資料" hasBottomLine={false}>
            <div styleName="nameFormControl">
              <InputText
                ref={(realNameInput) => {
                  this.realNameInput = realNameInput;
                }}
                placeholder="真實姓名"
                value={realName}
                onChange={this.changeInfo('realName')}
                constraints={constraints.realName}
                validateOnBlur
              />
            </div>
            <div styleName="idFormControl">
              <InputText
                ref={(idNumberInput) => {
                  this.idNumberInput = idNumberInput;
                }}
                placeholder="身分證字號/統編"
                value={idNumber}
                onChange={this.changeInfo('idNumber')}
                constraints={constraints.idNumber}
                validateOnBlur
              />
            </div>
          </FormBlock>
          <FormBlock title="銀行帳戶資訊" hasBottomLine={false}>
            <div styleName="formControl">
              <InputSelection
                ref={(accBankInput) => {
                  this.accBankInput = accBankInput;
                }}
                placeholder="選擇銀行"
                dropdownMaxHeight={250}
                value={accBankId}
                options={bankOptions}
                onSelect={this.onBankSelect}
                constraints={constraints.accBankId}
                validateOnBlur
              />
            </div>
            <div styleName="formControl">
              <InputSelection
                ref={(accBankBranchInput) => {
                  this.accBankBranchInput = accBankBranchInput;
                }}
                placeholder="選擇分行"
                dropdownMaxHeight={250}
                value={accBankBranchId}
                options={branchOptions}
                onSelect={this.onBranchSelect}
                constraints={constraints.accBankBranchId}
                validateOnBlur
                disabled={branchOptions.length === 0}
              />
            </div>
            <div styleName="formControl">
              <InputText
                ref={(accNameInput) => {
                  this.accNameInput = accNameInput;
                }}
                placeholder="戶名/公司名稱"
                value={accName}
                onChange={this.changeInfo('accName')}
                constraints={constraints.accName}
                validateOnBlur
              />
            </div>
            <div styleName="formControl">
              <InputText
                ref={(accNoInput) => {
                  this.accNoInput = accNoInput;
                }}
                placeholder="銀行帳號"
                value={accNo}
                onChange={this.changeInfo('accNo')}
                constraints={constraints.accNo}
                validateOnBlur
              />
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
      </Container>
    );
  }
}

export default CSS(BankSetupContainer, styles);
