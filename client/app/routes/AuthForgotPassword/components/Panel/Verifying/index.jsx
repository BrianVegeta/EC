import React from 'react';
import PropTypes from 'prop-types';
import { isNull } from 'lodash';

import TextField, {
  ICON_TYPE_VERIFICATION,
} from 'components/Input/TextField';
import FormButton from 'components/FormButton';
import constraints from 'constraints';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import {
  REQUEST_BY_PHONE,
  REQUEST_BY_EMAIL,
} from '../../../modules/forgotPassword';


const cx = classnames.bind(styles);
class Verifying extends React.Component {

  static propTypes = {
    dispatchResend: PropTypes.func.isRequired,
    dispatchVerify: PropTypes.func.isRequired,
    requestBy: PropTypes.oneOf([
      REQUEST_BY_EMAIL,
      REQUEST_BY_PHONE,
    ]).isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    verifyCode: PropTypes.string.isRequired,
    dispatchChangeForm: PropTypes.func.isRequired,
  };

  static renderResendButton({ content, onClick, disabled }) {
    return (
      <FormButton
        colorType="greenBorder"
        size="lg"
        content={content}
        onClick={onClick}
        disabled={disabled}
      />
    );
  }

  constructor(props) {
    super(props);
    this.onVerify = this.onVerify.bind(this);
    this.onResend = this.onResend.bind(this);
    this.state = {
      resendWait: null,
    };
  }

  componentWillUnmount() {
    this.destroyCounter();
  }

  onResend() {
    this.props.dispatchResend().then(() => {
      this.setCounter();
    });
  }

  onVerify() {
    const isValid = this.verifyInput.valid();
    if (isValid) {
      this.props.dispatchVerify();
    }
  }

  setCounter() {
    this.setState({ resendWait: 30 });
    this.counter = setInterval(() => {
      const { resendWait } = this.state;
      if (resendWait === 0) {
        this.destroyCounter();
        return;
      }
      this.setState({ resendWait: (resendWait - 1) });
    }, 1000);
  }

  destroyCounter() {
    clearInterval(this.counter);
    this.setState({ resendWait: null });
  }

  render() {
    const { resendWait } = this.state;
    const {
      requestBy,
      email,
      phone,
      verifyCode,
      dispatchChangeForm,
    } = this.props;
    const { renderResendButton } = this.constructor;
    const [textLabel, identityValue] = {
      [REQUEST_BY_EMAIL]: ['Email', email],
      [REQUEST_BY_PHONE]: ['簡訊', phone],
    }[requestBy];

    const refVerify = input => (this.verifyInput = input);
    return (
      <div styleName="container">
        <TextField
          ref={refVerify}
          icon={ICON_TYPE_VERIFICATION}
          placeholder="請輸入驗證碼"
          value={verifyCode}
          onChange={value => dispatchChangeForm({ verifyCode: value })}
          onEnter={this.onVerify}
          constraints={constraints.verifyCode}
        />
        <div styleName="identity">{identityValue}</div>
        <div styleName="notice">
          <div>請輸入{textLabel}內的驗證碼</div>
          <div>若您未收到{textLabel}，請嘗試以下方式:</div>
        </div>
        <div className={cx('button')}>
          <FormButton content="驗證" size="lg" onClick={this.onVerify} />
        </div>
        <div className={cx('button', 'bottom')}>
          {renderResendButton(
            isNull(resendWait) ? ({
              content: '重新傳送驗證碼',
              onClick: this.onResend,
            }) : ({
              content: `${resendWait}s`,
              onClick: () => {},
              disabled: true,
            }),
          )}
        </div>
      </div>
    );
  }
}

export default CSS(Verifying, styles);
