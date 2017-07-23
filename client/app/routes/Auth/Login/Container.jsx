import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import { connect } from 'react-redux';

import FacebookLogin from 'react-facebook-login';
import TextField from 'components/Input/TextField';
import FormButton from 'components/FormButton';
import AlertPanel from 'components/AlertPanel';

import { FACEBOOK_APP_ID } from 'constants/config';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import LoginModel from './LoginModel';

const cx = classnames.bind(styles);
class LoginContainer extends React.Component {

  static propTypes = {
    auth: myPropTypes.loginAuth.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  renderAlertMsg() {
    const { loginFailMessage } = this.props.auth;
    if (!loginFailMessage) return null;

    return (
      <div styleName="alert">
        <AlertPanel message={loginFailMessage} />
      </div>
    );
  }

  render() {
    const { auth, dispatch } = this.props;
    const { loginBy, email, phone, password } = auth;
    const loginAuth = { loginBy, email, phone, password };

    const loginModel = new LoginModel({ ...loginAuth, dispatch });
    const {
      emailModel,
      phoneModel,
      passwordModel,
      EMAIL_AUTH,
      PHONE_AUTH,
    } = loginModel;

    return (
      <div styleName="container">
        {this.renderAlertMsg()}
        {{
          [EMAIL_AUTH]: (
            <TextField
              ref={loginInput => (this.login = loginInput)}
              icon="email"
              placeholder="Email"
              onChange={emailModel.onChange}
              value={emailModel.value}
            />
          ),
          [PHONE_AUTH]: (
            <TextField
              ref={loginInput => (this.login = loginInput)}
              icon="phone"
              placeholder="手機號碼"
              onChange={phoneModel.onChange}
              value={phoneModel.value}
            />
          ),
        }[loginBy]}
        <TextField
          ref={input => (this.password = input)}
          icon="password"
          placeholder="密碼"
          type="password"
          onChange={passwordModel.onChange}
          value={passwordModel.value}
        />
        <div className={cx('button')}>
          <FormButton
            content="登入"
            size="lg"
            style={{ width: '100%' }}
            onClick={{
              [EMAIL_AUTH]: loginModel.onEmailLogin,
              [PHONE_AUTH]: loginModel.onPhoneLogin,
            }[loginBy]}
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
