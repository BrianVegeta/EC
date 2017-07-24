import { EMAIL_AUTH, PHONE_AUTH } from 'constants/authBy';
import {
  changeForm,
  verifyEmail,
  verifyPhone,
} from 'actions/authActions';
import SimpleInputHocModel from './SimpleInputHocModel';

export default class {
  constructor({ email, phone, verifyCode, dispatch }) {
    this.props = {
      email,
      phone,
      verifyCode,
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
  }

  onEmailVerify() {
    const { email, verifyCode } = this.props;
    this.props.dispatch(
      verifyEmail({ email, verifycode: verifyCode }),
    );
  }

  onPhoneVerify() {
    const { phone, verifyCode } = this.props;
    this.props.dispatch(
      verifyPhone({ phone, sms: verifyCode }),
    );
  }
}
