import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import { connect } from 'react-redux';

import FacebookLogin from 'react-facebook-login';
import TextField from 'components/Input/TextField';
import FormButton from 'components/FormButton';
import AlertPanel from 'components/Alert/Panel';

import { FACEBOOK_APP_ID } from 'constants/config';
import constraints from 'constraints';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import LoginModel from './LoginModel';

const cx = classnames.bind(styles);
class LoginContainer extends React.Component {

  static propTypes = {
    auth: PropTypes.shape(
      myPropTypes.loginAuthShape,
    ).isRequired,
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
    const { auth, dispatch } = this.props;
    const { loginBy, email, phone, password, loginError } = auth;
    const loginAuth = { loginBy, email, phone, password };

    const loginModel = new LoginModel({ ...loginAuth, dispatch });
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
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { auth } = state;
  return ({ auth });
};
export default connect(mapStateToProps)(CSS(LoginContainer, styles));
