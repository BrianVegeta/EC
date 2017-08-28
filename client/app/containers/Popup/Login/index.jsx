import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router';
import { LOGIN_BY_EMAIL, LOGIN_BY_PHONE } from 'modules/login';

import CSS from 'react-css-modules';
import { authPath } from 'lib/paths';
import styles from './styles.sass';
import Component from './Component';


class LoginPopUp extends React.Component {

  static propTypes = {
    onClose: PropTypes.func.isRequired,
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

  render() {
    const { onClose, ...others } = this.props;
    return (
      <div styleName="container">
        <div style={{ float: 'right' }}>
          <button styleName="close-button" onClick={onClose} >X</button>
        </div>
        <div styleName="title">登入</div>
        <Component {...others} />
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
