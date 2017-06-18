import Email from './Email';
import Phone from './Phone';
import Password from './Password';
import PasswordConfirmation from './PasswordConfirmation';
import Nickname from './Nickname';
import VerifyCode from './VerifyCode';
import { EMAIL, PHONE } from '../../../../constants/authBy';
import {
  updateRegisterBy,
  registerByEmail,
  registerByPhone,
  verifyByEmail,
  verifyByPhone,
} from '../../../../actions/authActions';
import { REGISTER_VERIFING } from '../../../../constants/states';


class RegistrationModel {
  constructor(props, dispatch) {
    const {
      email,
      phone,
      password,
      passwordConfirmation,
      nickname,
      registerBy,
      verifyCode,
      registerState,
      registerFailMessage,
      verifyFailMessage,
    } = props;

    // registerBy
    this.registerBy = registerBy;
    this.isRegisterByEmail = this.isRegisterBy(EMAIL);
    this.isRegisterByPhone = this.isRegisterBy(PHONE);
    this.switchRegisterBy = this.switchRegisterBy.bind(this);
    this.submit = this.submit.bind(this);
    this.verify = this.verify.bind(this);

    // state
    this.isVerifying = (registerState === REGISTER_VERIFING);
    this.verifyCode = new VerifyCode(verifyCode, dispatch);
    // alert
    this.registerFailMessage = registerFailMessage;
    this.verifyFailMessage = verifyFailMessage;

    this.dispatch = dispatch;
    this.login = this.isRegisterByEmail ? new Email(email, dispatch) : new Phone(phone, dispatch);
    this.password = new Password(password, dispatch);
    this.passwordConfirmation = new PasswordConfirmation(passwordConfirmation, password, dispatch);
    this.nickname = new Nickname(nickname, dispatch);
    this.isValid = this.isValid();
  }

  isRegisterBy(authBy) {
    return this.registerBy === authBy;
  }

  switchRegisterBy() {
    const authBy = this.isRegisterByEmail ? PHONE : EMAIL;
    this.dispatch(updateRegisterBy(authBy));
  }

  isValid() {
    return this.login.isValid
      && this.password.isValid
      && this.passwordConfirmation.isValid
      && this.nickname.isValid;
  }

  submit() {
    if (this.isRegisterByEmail) {
      this.dispatch(registerByEmail({
        email: this.login.value,
        password: this.password.value,
      }));
    } else {
      this.dispatch(registerByPhone({
        phone: this.login.value,
        password: this.password.value,
      }));
    }
  }

  verify() {
    if (this.isRegisterByEmail) {
      this.dispatch(verifyByEmail({
        email: this.login.value,
        verifycode: this.verifyCode.value,
      }));
    } else {
      this.dispatch(verifyByPhone({
        phone: this.login.value,
        sms: this.verifyCode.value,
      }));
    }
  }
}
export default RegistrationModel;
