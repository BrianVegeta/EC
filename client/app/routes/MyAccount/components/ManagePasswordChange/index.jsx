import React from 'react';
import PropTypes from 'prop-types';

import TableForm, { TableRow } from 'components/TableForm';
import InputPassword from 'components/Input/Password';
import FormButton from 'components/FormButton';
import constraints from 'constraints';
import { Link } from 'react-router';
import { forgotPasswordPath } from 'lib/paths';
import CSS from 'react-css-modules';
import styles from './styles.sass';


class Profile extends React.Component {

  static propTypes = {
    hasDataChanged: PropTypes.bool.isRequired,
    passwordChange: PropTypes.shape({
      data: PropTypes.object.isRequired,
    }).isRequired,
    dispatchChangeData: PropTypes.func.isRequired,
    dispatchReset: PropTypes.func.isRequired,
    dispatchUpdatePassword: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.dispatchReset();
  }

  onSubmit() {
    const isPasswordValid = this.passwordInput.valid();
    const isNewPasswordValid = this.newPasswordInput.valid();
    const isNewPasswordConfirmation = this.newPasswordConfirmationInput.valid();
    if (isPasswordValid && isNewPasswordValid && isNewPasswordConfirmation) {
      this.props.dispatchUpdatePassword();
    }
  }

  render() {
    const {
      dispatchChangeData,
      hasDataChanged,
      passwordChange: {
        data: {
          password,
          newPassword,
          newPasswordConfirmation,
        },
      },
    } = this.props;
    const refPassword = input => (this.passwordInput = input);
    const refNewPassword = input => (this.newPasswordInput = input);
    const refNewPasswordConfirmation = input => (this.newPasswordConfirmationInput = input);
    return (
      <div styleName="form-container">
        <TableForm>
          <TableRow labelWidth={100}>
            <span styleName="label">舊密碼</span>
            <div styleName="input-container">
              <div styleName="input">
                <InputPassword
                  ref={refPassword}
                  value={password}
                  placeholder="請輸入密碼"
                  onChange={value => dispatchChangeData({ password: value })}
                  autoComplete="off"
                  constraints={constraints.password}
                  validateOnBlur
                />
              </div>
              <Link
                styleName="forgot-password"
                to={forgotPasswordPath}
              >
                <span>忘記密碼？</span>
              </Link>
            </div>
          </TableRow>
          <TableRow>
            <span styleName="label">新密碼</span>
            <div styleName="input-container">
              <div styleName="input">
                <InputPassword
                  ref={refNewPassword}
                  value={newPassword}
                  placeholder="請輸入新密碼"
                  onChange={value => dispatchChangeData({ newPassword: value })}
                  autoComplete="off"
                  constraints={constraints.password}
                  validateOnBlur
                />
              </div>
            </div>
          </TableRow>
          <TableRow>
            <span styleName="label">新密碼確認</span>
            <div styleName="input-container">
              <div styleName="input">
                <InputPassword
                  ref={refNewPasswordConfirmation}
                  value={newPasswordConfirmation}
                  placeholder="請確認新密碼"
                  onChange={value => dispatchChangeData({ newPasswordConfirmation: value })}
                  autoComplete="off"
                  equalityTarget={{ password: newPassword }}
                  constraints={constraints.passwordConfirmation}
                  validateOnBlur
                />
              </div>
            </div>
          </TableRow>
        </TableForm>
        <FormButton
          content="儲存"
          colorType="orange"
          style={{ padding: '12px 50px' }}
          width="auto"
          onClick={this.onSubmit}
          disabled={!hasDataChanged}
        />
      </div>
    );
  }
}

export default CSS(Profile, styles);
