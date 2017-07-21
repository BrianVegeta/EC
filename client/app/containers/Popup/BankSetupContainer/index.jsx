import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FormBlock from 'components/Form/Block';
import InputText from 'components/Input/Text';
import InputSelection from 'components/Input/Selection';
import InputPassword from 'components/Input/Password';
import FormButton from 'components/FormButton';

import { nextProcess } from 'actions/scheduleActions';
import { prepareBanks } from 'actions/optionsActions';
import { setBankInfo } from 'actions/popupBankSetupActions';

import ModelPopupBankSetup from 'models/PopupBankSetup';
import ConfirmUpdatePhoneContainer from 'containers/ConfirmUpdate/PhoneContainer';
import ConfirmUpdateEmailContainer from 'containers/ConfirmUpdate/EmailContainer';

import constraints from 'constraints';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class BankSetupContainer extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    popupBankSetup: PropTypes.object.isRequired,
    options: PropTypes.shape({ banks: PropTypes.array }).isRequired,
  };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    // bank options
    dispatch(prepareBanks());
    // set bank info
    dispatch(setBankInfo());
  }

  onSubmit() {
    const { dispatch } = this.props;
    dispatch(nextProcess());
  }

  render() {
    const { options, popupBankSetup, dispatch } = this.props;

    const {
      realNameModel, identityNoModel,
      phoneModel, emailModel,
      bankModel, bankBranchModel, accNameModel, accNoModel,
      pwdCheck,
    } = new ModelPopupBankSetup({ options, popupBankSetup, dispatch });

    return (
      <div styleName="container">
        <div styleName="header">設定銀行帳戶</div>
        <div styleName="body">
          <p styleName="warning">您填寫的資訊必須與身分證一致，以利銀行核對，否則將會影響日後撥款權益。</p>
          <FormBlock title="基本資料" hasBottomLine={false}>
            <div styleName="nameFormControl">
              <InputText
                placeholder="真實姓名"
                value={realNameModel.value}
                onChange={realNameModel.onChange}
                constraints={constraints.realName}
              />
            </div>
            <div styleName="idFormControl">
              <InputText
                placeholder="身分證字號/統編"
                value={identityNoModel.value}
                onChange={identityNoModel.onChange}
                constraints={constraints.identityNo}
              />
            </div>
          </FormBlock>
          <ConfirmUpdatePhoneContainer
            value={phoneModel.value}
            onChange={phoneModel.onChange}
          />
          <ConfirmUpdateEmailContainer
            value={emailModel.value}
            onChange={emailModel.onChange}
          />
          <FormBlock title="銀行帳戶資訊" hasBottomLine={false}>
            <div styleName="formControl">
              <InputSelection
                placeholder="選擇銀行"
                dropdownMaxHeight={250}
                value={bankModel.value}
                options={bankModel.options}
                onSelect={bankModel.onSelect}
                containers={constraints.accBankId}
              />
            </div>
            <div styleName="formControl">
              <InputSelection
                placeholder="選擇分行"
                dropdownMaxHeight={250}
                options={bankBranchModel.options}
                onSelect={bankBranchModel.onSelect}
                constraints={constraints.accBankBranchId}
                disabled={bankBranchModel.disabled}
              />
            </div>
            <div styleName="formControl">
              <InputText
                placeholder="戶名/公司名稱"
                value={accNameModel.value}
                validator={accNameModel.validator}
                onChange={accNameModel.onChange}
                constraints={constraints.accName}
              />
            </div>
            <div styleName="formControl">
              <InputText
                placeholder="銀行帳號"
                value={accNoModel.value}
                onChange={accNoModel.onChange}
                constraints={constraints.accNo}
              />
            </div>
          </FormBlock>
          <FormBlock title="設定密碼" hasBottomLine={false}>
            <InputPassword
              placeholder="請輸入8個以上英數字"
              autoComplete="off"

              value={pwdCheck.value}
              onChange={pwdCheck.onChange}
            />
            <div styleName="passwordCheckHelper">
              為了您的帳戶安全，請設定密碼以協助我們確認您的身份
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

const mapStateToProps = (state) => {
  const {
    environment,
    item,
    reservation,
    myCoupons,
    modal,
    options,
    popupBankSetup,
  } = state;

  return ({
    environment,
    item,
    reservation,
    myCoupons,
    modal,
    options,
    popupBankSetup,
  });
};
export default connect(mapStateToProps)(CSS(BankSetupContainer, styles));
