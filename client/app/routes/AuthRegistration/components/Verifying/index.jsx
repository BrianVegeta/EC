import React from 'react';
import PropTypes from 'prop-types';

import TextField, {
  ICON_TYPE_VERIFICATION,
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
class Verifying extends React.Component {

  static propTypes = {
    dispatchResendEmail: PropTypes.func.isRequired,
    dispatchResendPhone: PropTypes.func.isRequired,
    dispatchVerifyEmail: PropTypes.func.isRequired,
    dispatchVerifyPhone: PropTypes.func.isRequired,
    dispatchChangeForm: PropTypes.func.isRequired,
    registration: PropTypes.shape({
      registerBy: PropTypes.oneOf([REGISTER_BY_EMAIL, REGISTER_BY_PHONE]).isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      verifyCode: PropTypes.string.isRequired,
    }).isRequired,
  };

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
    const {
      dispatchResendEmail,
      dispatchResendPhone,
      registration: { registerBy },
    } = this.props;
    const dispatchResend = {
      [REGISTER_BY_EMAIL]: dispatchResendEmail,
      [REGISTER_BY_PHONE]: dispatchResendPhone,
    }[registerBy];
    dispatchResend().then(() => {
      this.setCounter();
    });
  }

  onVerify() {
    const isValid = this.verifyInput.valid();
    if (isValid) {
      const {
        dispatchVerifyEmail,
        dispatchVerifyPhone,
        registration: { registerBy },
      } = this.props;
      const dispatchVerify = {
        [REGISTER_BY_EMAIL]: dispatchVerifyEmail,
        [REGISTER_BY_PHONE]: dispatchVerifyPhone,
      }[registerBy];
      dispatchVerify();
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

  renderLoading() {
    const { registration: { isLoading } } = this.props;
    if (!isLoading) return null;
    return <LoadingOverlay />;
  }

  renderError() {
    const { registration: { verifyError } } = this.props;
    if (!verifyError) return null;
    return <AlertPanel text={verifyError} />;
  }

  renderResendButton() {
    const { resendWait } = this.state;
    const buttonProps = { colorType: 'greenBorder', size: 'lg' };
    if (resendWait === null) {
      return (
        <FormButton
          {...buttonProps}
          content="重新傳送驗證碼"
          onClick={this.onResend}
        />
      );
    }
    return (
      <FormButton
        {...buttonProps}
        content={`${resendWait}s`}
        onClick={() => {}}
        disabled
      />
    );
  }

  render() {
    const {
      dispatchChangeForm,
      registration: {
        registerBy,
        email,
        phone,
        verifyCode,
      },
    } = this.props;

    const label = {
      [REGISTER_BY_EMAIL]: 'Email',
      [REGISTER_BY_PHONE]: '簡訊',
    }[registerBy];

    return (
      <div styleName="container">
        {this.renderLoading()}
        {this.renderError()}
        <TextField
          ref={input => (this.verifyInput = input)}
          icon={ICON_TYPE_VERIFICATION}
          placeholder="請輸入驗證碼"
          value={verifyCode}
          onChange={value => dispatchChangeForm({ verifyCode: value })}
          onEnter={this.onVerify}
          constraints={constraints.verifyCode}
        />
        <div styleName="identity">
          {{
            [REGISTER_BY_EMAIL]: email,
            [REGISTER_BY_PHONE]: phone,
          }[registerBy]}
        </div>
        <div styleName="notice">
          <div>請輸入{label}內的驗證碼</div>
          <div>若您未收到{label}，請嘗試以下方式:</div>
        </div>
        <div className={cx('button')}>
          {this.renderResendButton()}
        </div>
        <div className={cx('button', 'bottom')}>
          <FormButton
            content="驗證"
            size="lg"
            onClick={this.onVerify}
          />
        </div>
      </div>
    );
  }
}

export default CSS(Verifying, styles);
