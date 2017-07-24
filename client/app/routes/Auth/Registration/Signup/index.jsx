import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import { pick } from 'lodash';

import TextField from 'components/Input/TextField';
import FormButton from 'components/FormButton';
import AlertPanel from 'components/Alert/Panel';
import constraints from 'constraints';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

import SignupModel from '../Model/SignupModel';


const cx = classnames.bind(styles);
class Signup extends React.Component {

  static propTypes = {
    signupAuth: PropTypes.shape(
      myPropTypes.signupAuthShape,
    ).isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  register({ onRegister }) {
    const loginValid = this.loginInput.valid();
    const passwordValid = this.passwordInput.valid();
    const passwordConfirmationValid = this.passwordConfirmationInput.valid();
    const nicknameValid = this.nicknameInput.valid();
    if (
      loginValid &&
      passwordValid &&
      passwordConfirmationValid &&
      nicknameValid
    ) {
      onRegister();
    }
  }

  render() {
    const { signupAuth, dispatch } = this.props;
    const {
      registerError,
      registerBy,
      ...{
        email,
        phone,
        password,
        passwordConfirmation,
        nickname,
      }
    } = signupAuth;

    const signupModel = new SignupModel({
      dispatch,
      ...{
        email,
        phone,
        password,
        passwordConfirmation,
        nickname,
      },
    });

    const {
      emailModel,
      phoneModel,
      passwordModel,
      passwordConfirmationModel,
      nicknameModel,

      EMAIL_AUTH,
      PHONE_AUTH,
    } = signupModel;

    const onRegister = {
      [EMAIL_AUTH]: signupModel.onEmailRegister,
      [PHONE_AUTH]: signupModel.onPhoneRegister,
    }[registerBy];

    return (
      <div styleName="container">
        <AlertPanel text={registerError} />
        {{
          [EMAIL_AUTH]: (
            <TextField
              ref={loginInput => (this.loginInput = loginInput)}
              icon="email"
              placeholder="Email"
              value={emailModel.value}
              onChange={emailModel.onChange}
              constraints={constraints.email}
            />
          ),
          [PHONE_AUTH]: (
            <TextField
              ref={loginInput => (this.loginInput = loginInput)}
              icon="phone"
              placeholder="手機號碼"
              value={phoneModel.value}
              onChange={phoneModel.onChange}
              constraints={constraints.phone}
            />
          ),
        }[registerBy]}
        <TextField
          ref={input => (this.passwordInput = input)}
          icon="password"
          placeholder="密碼"
          type="password"
          value={passwordModel.value}
          onChange={passwordModel.onChange}
          constraints={constraints.password}
        />
        <TextField
          ref={input => (this.passwordConfirmationInput = input)}
          icon="password"
          placeholder="密碼確認"
          type="password"
          value={passwordConfirmationModel.value}
          onChange={passwordConfirmationModel.onChange}
          valuesToEqual={{
            password: passwordModel.value,
            passwordConfirmation: passwordConfirmationModel.value,
          }}
          constraints={pick(constraints, ['password', 'passwordConfirmation'])}
        />
        <TextField
          ref={input => (this.nicknameInput = input)}
          placeholder="暱稱"
          value={nicknameModel.value}
          onChange={nicknameModel.onChange}
          constraints={constraints.nickname}
        />
        <div className={cx('button')}>
          <FormButton
            content="註冊"
            size="lg"
            style={{ width: '100%' }}
            onClick={() => this.register({ onRegister })}
          />
        </div>
        <div className={cx('button', 'bottom')}>
          <FormButton
            content={{
              [EMAIL_AUTH]: '使用手機號碼註冊',
              [PHONE_AUTH]: '使用 Email 註冊',
            }[registerBy]}
            colorType="greenBorder"
            size="lg"
            style={{ width: '100%' }}
            onClick={{
              [EMAIL_AUTH]: signupModel.onSwitchPhoneRegister,
              [PHONE_AUTH]: signupModel.onSwitchEmailRegister,
            }[registerBy]}
          />
        </div>
      </div>
    );
  }
}

export default CSS(Signup, styles);
