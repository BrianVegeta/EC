import { EMAIL_AUTH, PHONE_AUTH } from 'constants/authBy';
import {
  changeForm,
  changeRegisterBy,
  registerByEmail,
  registerByPhone,
} from 'actions/authActions';
import SimpleInputHocModel from './SimpleInputHocModel';

export default class {
  constructor({
    email,
    phone,
    password,
    passwordConfirmation,
    nickname,
    dispatch,
  }) {
    const simpleInputProps = {
      email,
      phone,
      password,
      passwordConfirmation,
      nickname,
    };
    this.props = {
      ...simpleInputProps,
      dispatch,
    };

    const SimpleInputModel = SimpleInputHocModel(
      simpleInputProps, dispatch, changeForm,
    );
    this.emailModel = new SimpleInputModel('email');
    this.phoneModel = new SimpleInputModel('phone');
    this.passwordModel = new SimpleInputModel('password');
    this.passwordConfirmationModel = new SimpleInputModel('passwordConfirmation');
    this.nicknameModel = new SimpleInputModel('nickname');

    this.EMAIL_AUTH = EMAIL_AUTH;
    this.PHONE_AUTH = PHONE_AUTH;

    /* BINDS */
    this.onEmailRegister = this.onEmailRegister.bind(this);
    this.onPhoneRegister = this.onPhoneRegister.bind(this);
    this.onSwitchEmailRegister = this.onSwitchEmailRegister.bind(this);
    this.onSwitchPhoneRegister = this.onSwitchPhoneRegister.bind(this);
  }

  onEmailRegister() {
    const { email, password } = this.props;
    this.props.dispatch(
      registerByEmail({ email, password }),
    );
  }

  onPhoneRegister() {
    const { phone, password } = this.props;
    this.props.dispatch(
      registerByPhone({ phone, password }),
    );
  }

  onSwitchEmailRegister() {
    this.props.dispatch(
      changeRegisterBy(EMAIL_AUTH),
    );
  }

  onSwitchPhoneRegister() {
    this.props.dispatch(
      changeRegisterBy(PHONE_AUTH),
    );
  }
}
