import React from 'react';
import PropTypes from 'prop-types';

import FacebookLogin from 'react-facebook-login';
import TextField, {
  ICON_TYPE_PHONE,
  ICON_TYPE_EMAIL,
  ICON_TYPE_PASSWORD,
} from 'components/Input/TextField';
import FormButton from 'components/FormButton';
import AlertPanel from 'components/Alert/Panel';
import LoadingOverlay from 'components/Loading/Overlay';
import { FACEBOOK_APP_ID } from 'constants/config';
import constraints from 'constraints';
import { LOGIN_BY_EMAIL, LOGIN_BY_PHONE } from 'modules/login';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';


const cx = classnames.bind(styles);
class Login extends React.Component {

  static propTypes = {
    login: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired,
      loginBy: PropTypes.oneOf([
        LOGIN_BY_EMAIL,
        LOGIN_BY_PHONE,
      ]).isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
    }).isRequired,

    dispatchChangeForm: PropTypes.func.isRequired,
    dispatchSwitchEmailLogin: PropTypes.func.isRequired,
    dispatchSwitchPhoneLogin: PropTypes.func.isRequired,
    dispatchLoginEmail: PropTypes.func.isRequired,
    dispatchLoginPhone: PropTypes.func.isRequired,
    dispatchLoginFB: PropTypes.func.isRequired,
    dispatchReset: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    this.props.dispatchReset();
  }

  login() {
    const isLoginValid = this.loginInput.valid();
    const isPasswordValid = this.passwordInput.valid();
    if (!isLoginValid || !isPasswordValid) return;
    const {
      dispatchLoginEmail,
      dispatchLoginPhone,
      login,
      login: { loginBy },
    } = this.props;
    const doLogin = {
      [LOGIN_BY_EMAIL]: dispatchLoginEmail,
      [LOGIN_BY_PHONE]: dispatchLoginPhone,
    }[loginBy];
    doLogin(login);
  }

  renderError() {
    const { login: { loginError } } = this.props;
    if (!loginError) return null;
    return <AlertPanel text={loginError} />;
  }

  renderLoading() {
    const { login: { isLoading } } = this.props;
    if (!isLoading) return null;
    return <LoadingOverlay />;
  }

  render() {
    const {
      login: { loginBy, email, phone, password },
      dispatchChangeForm,
      dispatchSwitchPhoneLogin,
      dispatchSwitchEmailLogin,
      dispatchLoginFB,
    } = this.props;

    return (
      <div styleName="container">
        {this.renderLoading()}
        {this.renderError()}
        {{
          [LOGIN_BY_EMAIL]: (
            <TextField
              ref={loginInput => (this.loginInput = loginInput)}
              icon={ICON_TYPE_EMAIL}
              placeholder="Email"
              onChange={value => dispatchChangeForm({ email: value })}
              onEnter={this.login}
              value={email}
              constraints={constraints.email}
            />
          ),
          [LOGIN_BY_PHONE]: (
            <TextField
              ref={loginInput => (this.loginInput = loginInput)}
              icon={ICON_TYPE_PHONE}
              placeholder="手機號碼"
              onChange={value => dispatchChangeForm({ phone: value })}
              onEnter={this.login}
              value={phone}
              constraints={constraints.phone}
            />
          ),
        }[loginBy]}
        <TextField
          ref={input => (this.passwordInput = input)}
          icon={ICON_TYPE_PASSWORD}
          placeholder="密碼"
          type="password"
          onChange={value => dispatchChangeForm({ password: value })}
          onEnter={this.login}
          value={password}
          constraints={constraints.password}
        />
        <div className={cx('button')}>
          <FormButton
            content="登入"
            size="lg"
            style={{ width: '100%' }}
            onClick={this.login}
          />
        </div>
        <div className={cx('button', 'bottom')}>
          <FormButton
            content={{
              [LOGIN_BY_EMAIL]: '使用手機號碼登入',
              [LOGIN_BY_PHONE]: '使用 Email 登入',
            }[loginBy]}
            colorType="greenBorder"
            size="lg"
            style={{ width: '100%' }}
            onClick={{
              [LOGIN_BY_EMAIL]: dispatchSwitchPhoneLogin,
              [LOGIN_BY_PHONE]: dispatchSwitchEmailLogin,
            }[loginBy]}
          />
        </div>
        <div className={cx('button')}>
          <FacebookLogin
            appId={FACEBOOK_APP_ID}
            textButton="Facebook 登入"
            fields="name,email,picture"
            callback={dispatchLoginFB}
          />
        </div>
      </div>
    );
  }
}

export default (CSS(Login, styles));
