import { EMAIL_AUTH, PHONE_AUTH } from 'constants/authBy';
import {
  changeForm,
  verifyEmail,
  verifyPhone,
  resendEmailVerification,
  resendPhoneVerification,
} from 'actions/authActions';
import SimpleInputHocModel from './SimpleInputHocModel';

export default class {
  constructor({ email, phone, verifyCode, password, nickname, dispatch }) {
    this.props = {
      email,
      phone,
      verifyCode,
      password,
      nickname,
      dispatch,
    };

    const SimpleInputModel = SimpleInputHocModel(
      { verifyCode }, dispatch, changeForm,
    );
    this.verifyCodeModel = new SimpleInputModel('verifyCode');

    this.EMAIL_AUTH = EMAIL_AUTH;
    this.PHONE_AUTH = PHONE_AUTH;

    /* BINDS */
    this.onEmailVerify = this.onEmailVerify.bind(this);
    this.onPhoneVerify = this.onPhoneVerify.bind(this);
    this.onResendEmail = this.onResendEmail.bind(this);
    this.onResendPhone = this.onResendPhone.bind(this);
  }

  onEmailVerify() {
    const { email, verifyCode, password, nickname } = this.props;
    this.props.dispatch(
      verifyEmail({
        email,
        verifycode: verifyCode,
        password,
        name: nickname,
      }),
    );
  }

  onResendEmail() {
    const { email } = this.props;
    this.props.dispatch(
      resendEmailVerification({ email }),
    );
  }

  onPhoneVerify() {
    const { phone, verifyCode, password, nickname } = this.props;
    this.props.dispatch(
      verifyPhone({
        phone,
        sms: verifyCode,
        password,
        name: nickname,
      }),
    );
  }

  onResendPhone() {
    const { phone } = this.props;
    this.props.dispatch(
      resendPhoneVerification({ phone }),
    );
  }
}
