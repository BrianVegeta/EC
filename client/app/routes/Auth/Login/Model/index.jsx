import Email from './Email';
import Phone from './Phone';
import Password from './Password';
import { EMAIL, PHONE } from '../../../../constants/authBy';
import {
  updateRegisterBy,
  loginByEmail,
  loginByPhone,
  loginFacebook,
} from '../../../../actions/authActions';


class RegistrationModel {
  constructor(props, dispatch) {
    const {
      email,
      phone,
      password,
      registerBy,
      loginFailMessage,
    } = props;

    // registerBy
    this.registerBy = registerBy;
    this.isRegisterByEmail = this.isRegisterBy(EMAIL);
    this.isRegisterByPhone = this.isRegisterBy(PHONE);
    this.switchRegisterBy = this.switchRegisterBy.bind(this);
    this.doLogin = this.doLogin.bind(this);
    this.loginFacebook = this.loginFacebook.bind(this);
    // alert
    this.loginFailMessage = loginFailMessage;

    this.dispatch = dispatch;
    this.login = this.isRegisterByEmail ? new Email(email, dispatch) : new Phone(phone, dispatch);
    this.password = new Password(password, dispatch);
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
    return this.login.isValid && this.password.isValid;
  }

  doLogin() {
    if (this.isRegisterByEmail) {
      this.dispatch(loginByEmail({
        email: this.login.value,
        password: this.password.value,
      }));
    } else {
      this.dispatch(loginByPhone({
        phone: this.login.value,
        password: this.password.value,
      }));
    }
  }

  loginFacebook(response) {
    this.dispatch(loginFacebook(response));
  }
}
export default RegistrationModel;
