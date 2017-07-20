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

import CSS from 'react-css-modules';
import styles from './styles.sass';

class BankSetupContainer extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
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
    const {
      realName,
      identityNo,
      phone,
      email,
      bank,
      bankBranch,
      accName,
      accNo,
      pwdCheck,
    } = new ModelPopupBankSetup(this.props);

    return (
      <div styleName="container">
        <div styleName="header">設定銀行帳戶</div>
        <div styleName="body">
          <p styleName="warning">您填寫的資訊必須與身分證一致，以利銀行核對，否則將會影響日後撥款權益。</p>
          <FormBlock title="基本資料" hasBottomLine={false}>
            <div styleName="nameFormControl">
              <InputText
                placeholder="真實姓名"
                value={realName.value}
                validator={realName.validator}
                onChange={realName.onChange}
              />
            </div>
            <div styleName="idFormControl">
              <InputText
                placeholder="身分證字號/統編"
                value={identityNo.value}
                validator={identityNo.validator}
                onChange={identityNo.onChange}
              />
            </div>
          </FormBlock>
          <ConfirmUpdatePhoneContainer
            value={phone}
            onChange={() => console.log('confirm updatge phone')}
          />
          <ConfirmUpdateEmailContainer
            value={email}
            onChange={() => console.log('confirm updatge phone')}
          />
          <FormBlock title="銀行帳戶資訊" hasBottomLine={false}>
            <div styleName="formControl">
              <InputSelection
                {...{
                  placeholder: '選擇銀行',
                  dropdownMaxHeight: 250,
                  value: bank.value,
                  options: bank.options,
                  onSelect: bank.onSelect,
                  validator: bank.validator,
                }}
              />
            </div>
            <div styleName="formControl">
              <InputSelection
                {...{
                  placeholder: '選擇分行',
                  dropdownMaxHeight: 250,
                  value: bankBranch.value,
                  options: bankBranch.options,
                  onSelect: bankBranch.onSelect,
                  validator: bankBranch.validator,
                  disabled: bankBranch.disabled,
                }}
              />
            </div>
            <div styleName="formControl">
              <InputText
                placeholder="戶名/公司名稱"
                value={accName.value}
                validator={accName.validator}
                onChange={accName.onChange}
              />
            </div>
            <div styleName="formControl">
              <InputText
                placeholder="銀行帳號"
                value={accNo.value}
                validator={accNo.validator}
                onChange={accNo.onChange}
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
