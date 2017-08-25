import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';

import FacebookLogin from 'react-facebook-login';
import TextField from 'components/Input/TextField';
import FormButton from 'components/FormButton';
import AlertPanel from 'components/Alert/Panel';
import LoadingOverlay from 'components/Loading/Overlay';
import { Link } from 'react-router';
import { FACEBOOK_APP_ID } from 'constants/config';
import constraints from 'constraints';
import LoginModel from 'models/LoginModel';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import { authPath } from 'lib/paths';
import styles from './styles.sass';

const cx = classnames.bind(styles);
class LoginPopUp extends React.Component {

  static propTypes = {
    auth: PropTypes.shape(myPropTypes.loginAuthShape).isRequired,
    dispatch: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onAfterLogin: PropTypes.func.isRequired,
  };

  login({ onLogin }) {
    const isLoginValid = this.loginInput.valid();
    const isPasswordValid = this.passwordInput.valid();
    if (isLoginValid && isPasswordValid) {
      onLogin();
    }
  }

  render() {
    const { auth, dispatch, onAfterLogin } = this.props;
    const {
      isLoading,
      loginError,
      ...{
        loginBy,
        email,
        phone,
        password,
      }
    } = auth;

    const loginModel = new LoginModel({
      ...{
        loginBy,
        email,
        phone,
        password,
      },
      dispatch,
      onAfterLogin,
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
        <div style={{ float: 'right' }}>
          <button
            styleName="popup-login-close-btn"
            onClick={this.props.onClose}
          >X</button>
        </div>
        <div styleName="popup-login-title">
          登入
        </div>
        {isLoading && <LoadingOverlay />}
        <AlertPanel text={loginError} />
        {{
          [EMAIL_AUTH]: (
            <TextField
              ref={loginInput => (this.loginInput = loginInput)}
              icon="email"
              placeholder="Email"
              onChange={emailModel.onChange}
              value={emailModel.value}
              constraints={constraints.email}
            />
          ),
          [PHONE_AUTH]: (
            <TextField
              ref={loginInput => (this.loginInput = loginInput)}
              icon="phone"
              placeholder="手機號碼"
              onChange={phoneModel.onChange}
              value={phoneModel.value}
              constraints={constraints.phone}
            />
          ),
        }[loginBy]}
        <TextField
          ref={input => (this.passwordInput = input)}
          icon="password"
          placeholder="密碼"
          type="password"
          onChange={passwordModel.onChange}
          value={passwordModel.value}
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
              [EMAIL_AUTH]: '使用手機號碼登入',
              [PHONE_AUTH]: '使用 Email 登入',
            }[loginBy]}
            colorType="greenBorder"
            size="lg"
            style={{ width: '100%' }}
            onClick={{
              [EMAIL_AUTH]: loginModel.switchPhoneLogin,
              [PHONE_AUTH]: loginModel.switchEmailLogin,
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
        <div style={{ padding: '20px 0px 20px 10px' }}>
          <Link to={authPath.registrationPath} >
            <span>註冊新帳號</span>
          </Link>
        </div>
      </div>
    );
  }
}

export default CSS(LoginPopUp, styles);