import React from 'react';
import PropTypes from 'prop-types';
import IconPhone from 'react-icons/lib/md/phone-iphone';
import IconLock from 'react-icons/lib/md/lock-outline';
import IconMail from 'react-icons/lib/md/mail-outline';
import FacebookLogin from 'react-facebook-login';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import TextField from '../../../../components/TextField';
import FormButton from '../../../../components/FormButton';
import AlertPanel from '../../../../components/AlertPanel';


const cx = classnames.bind(styles);
class SignupPanel extends React.Component {
  static propTypes = {
    model: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }
  submit() {
    const { model } = this.props;
    if (model.isValid) {
      model.doLogin();
    } else {
      this.login.validate();
      this.password.validate();
    }
  }
  render() {
    const { model } = this.props;
    const { login, password, loginFailMessage } = model;
    return (
      <div styleName="container">
        {loginFailMessage &&
          <div styleName="alert">
            <AlertPanel message={loginFailMessage} />
          </div>
        }
        {model.isRegisterByEmail &&
          <TextField
            ref={loginInput => (this.login = loginInput)}
            icon={IconMail}
            placeholder="Email"
            resource={login}
          />
        }
        {model.isRegisterByPhone &&
          <TextField
            ref={loginInput => (this.login = loginInput)}
            icon={IconPhone}
            placeholder="手機號碼"
            resource={login}
          />
        }
        <TextField
          ref={input => (this.password = input)}
          icon={IconLock}
          placeholder="密碼"
          type="password"
          resource={password}
        />
        <div className={cx('button')}>
          <FormButton
            content="登入"
            size="lg"
            style={{ width: '100%' }}
            onClick={this.submit}
          />
        </div>
        <div className={cx('button', 'bottom')}>
          <FormButton
            content={`使用${model.isRegisterByEmail ? '手機號碼' : 'Email'}登入`}
            colorType="greenBorder"
            size="lg"
            style={{ width: '100%' }}
            onClick={model.switchRegisterBy}
          />
        </div>
        <div className={cx('button')}>
          <FacebookLogin
            appId="332439867215198"
            textButton="Facebook 登入"
            fields="name,email,picture"
            callback={model.loginFacebook}
          />
        </div>
      </div>
    );
  }
}

export default CSS(SignupPanel, styles);
