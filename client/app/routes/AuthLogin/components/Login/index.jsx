import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';

import FacebookLogin from 'react-facebook-login';
import TextField from 'components/Input/TextField';
import FormButton from 'components/FormButton';
import AlertPanel from 'components/Alert/Panel';
import LoadingOverlay from 'components/Loading/Overlay';
import { FACEBOOK_APP_ID } from 'constants/config';
import constraints from 'constraints';
import LoginModel from 'models/LoginModel';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import { LOGIN_BY_EMAIL, LOGIN_BY_PHONE } from '../../modules/login';


const cx = classnames.bind(styles);
class Login extends React.Component {

  static propTypes = {
    login: PropTypes.shape(myPropTypes.loginAuthShape).isRequired,
    dispatchChangeForm: PropTypes.func.isRequired,
    dispatchSwitchEmailLogin: PropTypes.func.isRequired,
    dispatchSwitchPhoneLogin: PropTypes.func.isRequired,
    dispatchLoginEmail: PropTypes.func.isRequired,
    dispatchLoginPhone: PropTypes.func.isRequired,
    dispatchLoginFB: PropTypes.func.isRequired,
    dispatchReset: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  login({ onLogin }) {
    const isLoginValid = this.loginInput.valid();
    const isPasswordValid = this.passwordInput.valid();
    if (isLoginValid && isPasswordValid) {
      onLogin();
    }
  }

  render() {
    const {
      login,
      dispatch,
      dispatchChangeForm,
      dispatchSwitchPhoneLogin,
      dispatchSwitchEmailLogin,
    } = this.props;
    const {
      isLoading,
      loginBy,
      loginError,
      email,
      phone,
      password,
      passwordConfirmation,
    } = login;
    const {
      isLoading,
      loginError,
      ...{
        loginBy,
        email,
        phone,
        password,
      }
    } = login;

    const loginModel = new LoginModel({
      ...{
        loginBy,
        email,
        phone,
        password,
      },
      dispatch,
      onAfterLogin: () => {},
    });

    const {
      emailModel,
      phoneModel,
      passwordModel,
      EMAIL_AUTH,
      PHONE_AUTH,
    } = loginModel;

    const onLogin = {
      [EMAIL_AUTH]: loginModel.onEmailLogin,
      [PHONE_AUTH]: loginModel.onPhoneLogin,
    }[loginBy];

    return (
      <div styleName="container">
        {isLoading && <LoadingOverlay />}
        <AlertPanel text={loginError} />
        {{
          [LOGIN_BY_EMAIL]: (
            <TextField
              ref={loginInput => (this.loginInput = loginInput)}
              icon="email"
              placeholder="Email"
              onChange={value => dispatchChangeForm({ email: value })}
              value={email}
              constraints={constraints.email}
            />
          ),
          [LOGIN_BY_PHONE]: (
            <TextField
              ref={loginInput => (this.loginInput = loginInput)}
              icon="phone"
              placeholder="手機號碼"
              onChange={value => dispatchChangeForm({ phone: value })}
              value={phone}
              constraints={constraints.phone}
            />
          ),
        }[loginBy]}
        <TextField
          ref={input => (this.passwordInput = input)}
          icon="password"
          placeholder="密碼"
          type="password"
          onChange={value => dispatchChangeForm({ password: value })}
          value={password}
          constraints={constraints.password}
        />
        <div className={cx('button')}>
          <FormButton
            content="登入"
            size="lg"
            style={{ width: '100%' }}
            onClick={() => this.login({ onLogin })}
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
            callback={loginModel.onFacebookLogin}
          />
        </div>
      </div>
    );
  }
}

export default (CSS(Login, styles));
