import React from 'react';
import PropTypes from 'prop-types';
import IconPhone from 'react-icons/lib/md/phone-iphone';
import IconLock from 'react-icons/lib/md/lock-outline';
import IconMail from 'react-icons/lib/md/mail-outline';
import IconVerified from 'react-icons/lib/md/verified-user';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import TextField from '../TextField';
import styles from './styles.sass';

const cx = classnames.bind(styles);
class LoginPanel extends React.Component {
  static renderSuffix(content) {
    return (
      <div className={cx('suffixContainer')}>
        <div className={cx('suffixInner')}>{content}</div>
      </div>
    );
  }
  render() {
    const { renderSuffix } = this.constructor;
    const forgotPassword = renderSuffix(
      <a>忘記？</a>,
    );
    const sendVerifyButton = renderSuffix(
      <button className={`${cx('sendVerifyButton')} button`}>獲取驗證碼</button>,
    );
    return (
      <div styleName="container">
        <TextField placeholder="暱稱" />
        <TextField icon={IconPhone} placeholder="手機號碼" />
        <TextField icon={IconMail} placeholder="Email" />
        <TextField
          icon={IconVerified}
          placeholder="請輸入驗證碼"
          suffix={sendVerifyButton}
          suffixWidth={110}
        />
        <TextField
          icon={IconLock}
          placeholder="密碼"
          suffix={forgotPassword}
          suffixWidth={60}
          type="password"
        />
        <TextField
          icon={IconLock}
          placeholder="密碼確認"
          type="password"
        />
      </div>
    );
  }
}

export default CSS(LoginPanel, styles);
