import React from 'react';
import PropTypes from 'prop-types';

import TextField, {
  ICON_TYPE_PHONE,
  ICON_TYPE_EMAIL,
  ICON_TYPE_PASSWORD,
} from 'components/Input/TextField';
import FormButton from 'components/FormButton';
import AlertPanel from 'components/Alert/Panel';
import LoadingOverlay from 'components/Loading/Overlay';
import constraints from 'constraints';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import {
  REGISTER_BY_EMAIL,
  REGISTER_BY_PHONE,
} from '../../modules/registration';


const cx = classnames.bind(styles);
class Registering extends React.Component {

  static propTypes = {
    dispatchRegisterEmail: PropTypes.func.isRequired,
    dispatchRegisterPhone: PropTypes.func.isRequired,
    dispatchSwitchRegisterByEmail: PropTypes.func.isRequired,
    dispatchSwitchRegisterByPhone: PropTypes.func.isRequired,
    dispatchChangeForm: PropTypes.func.isRequired,
    registration: PropTypes.shape({
      registerBy: PropTypes.oneOf([REGISTER_BY_EMAIL, REGISTER_BY_PHONE]).isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      passwordConfirmation: PropTypes.string.isRequired,
      nickname: PropTypes.string.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.onRegister = this.onRegister.bind(this);
  }

  onRegister() {
    const {
      dispatchRegisterEmail,
      dispatchRegisterPhone,
      registration: { registerBy },
    } = this.props;
    const loginValid = this.loginInput.valid();
    const passwordValid = this.passwordInput.valid();
    const passwordConfirmationValid = this.passwordConfirmationInput.valid();
    const nicknameValid = this.nicknameInput.valid();
    if (
      loginValid &&
      passwordValid &&
      passwordConfirmationValid &&
      nicknameValid
    ) {
      const dispatchRegister = {
        [REGISTER_BY_EMAIL]: dispatchRegisterEmail,
        [REGISTER_BY_PHONE]: dispatchRegisterPhone,
      }[registerBy];
      dispatchRegister();
    }
  }

  renderLoading() {
    const { registration: { isLoading } } = this.props;
    if (!isLoading) return null;
    return <LoadingOverlay />;
  }

  renderError() {
    const { registration: { registerError } } = this.props;
    if (!registerError) return null;
    return <AlertPanel text={registerError} />;
  }

  render() {
    const {
      dispatchSwitchRegisterByEmail,
      dispatchSwitchRegisterByPhone,
      dispatchChangeForm,
      registration: {
        registerBy,
        email,
        phone,
        password,
        passwordConfirmation,
        nickname,
      },
    } = this.props;

    return (
      <div styleName="container">
        {this.renderLoading()}
        {this.renderError()}
        {{
          [REGISTER_BY_EMAIL]: (
            <TextField
              ref={loginInput => (this.loginInput = loginInput)}
              icon={ICON_TYPE_EMAIL}
              placeholder="Email"
              value={email}
              onChange={value => dispatchChangeForm({ email: value })}
              onEnter={this.onRegister}
              constraints={constraints.email}
            />
          ),
          [REGISTER_BY_PHONE]: (
            <TextField
              ref={loginInput => (this.loginInput = loginInput)}
              icon={ICON_TYPE_PHONE}
              placeholder="手機號碼"
              value={phone}
              onChange={value => dispatchChangeForm({ phone: value })}
              onEnter={this.onRegister}
              constraints={constraints.phone}
            />
          ),
        }[registerBy]}
        <TextField
          ref={input => (this.passwordInput = input)}
          icon={ICON_TYPE_PASSWORD}
          placeholder="密碼"
          type="password"
          value={password}
          onChange={value => dispatchChangeForm({ password: value })}
          onEnter={this.onRegister}
          constraints={constraints.password}
        />
        <TextField
          ref={input => (this.passwordConfirmationInput = input)}
          icon={ICON_TYPE_PASSWORD}
          placeholder="密碼確認"
          type="password"
          value={passwordConfirmation}
          onChange={value => dispatchChangeForm({ passwordConfirmation: value })}
          onEnter={this.onRegister}
          equalityTarget={{ password }}
          constraints={constraints.passwordConfirmation}
        />
        <TextField
          ref={input => (this.nicknameInput = input)}
          placeholder="暱稱"
          value={nickname}
          onChange={value => dispatchChangeForm({ nickname: value })}
          onEnter={this.onRegister}
          constraints={constraints.nickname}
        />
        <div className={cx('button')}>
          <FormButton
            content="註冊"
            size="lg"
            onClick={this.onRegister}
          />
        </div>
        <div className={cx('button', 'bottom')}>
          <FormButton
            content={{
              [REGISTER_BY_EMAIL]: '使用手機號碼註冊',
              [REGISTER_BY_PHONE]: '使用 Email 註冊',
            }[registerBy]}
            colorType="greenBorder"
            size="lg"
            onClick={{
              [REGISTER_BY_EMAIL]: dispatchSwitchRegisterByPhone,
              [REGISTER_BY_PHONE]: dispatchSwitchRegisterByEmail,
            }[registerBy]}
          />
        </div>
      </div>
    );
  }
}

export default CSS(Registering, styles);
