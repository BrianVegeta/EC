import { EMAIL_AUTH, PHONE_AUTH } from 'constants/authBy';
import {
  changeForm,
  changeLoginBy,
  loginEmail,
  loginPhone,
  loginFacebook,
} from 'actions/authActions';
import SimpleInputHocModel from './SimpleInputHocModel';


class RegistrationModel {
  constructor({ email, phone, password, loginBy, dispatch }) {
    this.props = { email, phone, password, loginBy, dispatch };

    this.EMAIL_AUTH = EMAIL_AUTH;
    this.PHONE_AUTH = PHONE_AUTH;

    const SimpleInputModel = SimpleInputHocModel(
      { email, phone, password }, dispatch, changeForm,
    );
    this.emailModel = new SimpleInputModel('email');
    this.phoneModel = new SimpleInputModel('phone');
    this.passwordModel = new SimpleInputModel('password');

    this.onEmailLogin = this.onEmailLogin.bind(this);
    this.onPhoneLogin = this.onPhoneLogin.bind(this);
    this.onFacebookLogin = this.onFacebookLogin.bind(this);

    this.switchEmailLogin = this.switchEmailLogin.bind(this);
    this.switchPhoneLogin = this.switchPhoneLogin.bind(this);
  }

  onEmailLogin() {
    const { email, password } = this.props;
    this.props.dispatch(
      loginEmail({ email, password }),
    );
  }

  onPhoneLogin() {
    const { phone, password } = this.props;
    this.props.dispatch(
      loginPhone({ phone, password }),
    );
  }

  onFacebookLogin(response) {
    this.props.dispatch(
      loginFacebook(response),
    );
  }

  switchEmailLogin() {
    this.props.dispatch(
      changeLoginBy(EMAIL_AUTH),
    );
  }

  switchPhoneLogin() {
    this.props.dispatch(
      changeLoginBy(PHONE_AUTH),
    );
  }
}
export default RegistrationModel;
