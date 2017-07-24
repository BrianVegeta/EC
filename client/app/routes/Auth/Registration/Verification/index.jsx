import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';

import TextField from 'components/Input/TextField';
import FormButton from 'components/FormButton';
import AlertPanel from 'components/Alert/Panel';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

import VerificationModel from '../Model/VerificationModel';


const cx = classnames.bind(styles);
class Verification extends React.Component {

  static propTypes = {
    verificationAuth: PropTypes.shape(
      myPropTypes.verificationAuthShape,
    ).isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  verify(onVerify) {
    if (this.verifyInput.valid()) {
      onVerify();
    }
  }

  render() {
    const { verificationAuth, dispatch } = this.props;
    const {
      verifyError,
      registerBy,
      ...{
        email,
        phone,
        verifyCode,
      }
    } = verificationAuth;
    const verificationModel = new VerificationModel({
      ...{
        email,
        phone,
        verifyCode,
      },
      dispatch,
    });

    const {
      verifyCodeModel,
      EMAIL_AUTH,
      PHONE_AUTH,
    } = verificationModel;

    const verificatoinLabel = {
      [EMAIL_AUTH]: '信箱',
      [PHONE_AUTH]: '簡訊',
    }[registerBy];

    const onVerify = {
      [EMAIL_AUTH]: verificationModel.onEmailVerify,
      [PHONE_AUTH]: verificationModel.onPhoneVerify,
    }[registerBy];

    return (
      <div styleName="container">
        <AlertPanel text={verifyError} />
        <TextField
          ref={input => (this.verifyInput = input)}
          icon="verification"
          placeholder="請輸入驗證碼"
          value={verifyCodeModel.value}
          onChange={verifyCodeModel.onChange}
        />
        <div styleName="identity">
          {{
            [EMAIL_AUTH]: email,
            [PHONE_AUTH]: phone,
          }[registerBy]}
        </div>
        <div styleName="notice">
          <div>請輸入{verificatoinLabel}內的驗證碼</div>
          <div>若您未收到{verificatoinLabel}，請嘗試以下方式:</div>
        </div>
        <div className={cx('button')}>
          <FormButton
            content="重新傳送驗證碼"
            colorType="greenBorder"
            size="lg"
            style={{ width: '100%' }}
            onClick={() => this.verify(onVerify)}
          />
        </div>
        <div className={cx('button', 'bottom')}>
          <FormButton
            content="驗證"
            size="lg"
            style={{ width: '100%' }}
            onClick={() => this.verify(onVerify)}
          />
        </div>
      </div>
    );
  }
}

export default CSS(Verification, styles);
