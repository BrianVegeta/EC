import React from 'react';
import PropTypes from 'prop-types';

import TextField, { ICON_TYPE_PASSWORD } from 'components/Input/TextField';
import FormButton from 'components/FormButton';
import constraints from 'constraints';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';


const cx = classnames.bind(styles);
class Registering extends React.Component {

  static propTypes = {
    dispatchResetPassword: PropTypes.func.isRequired,
    dispatchChangeForm: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    passwordConfirmation: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.onReset = this.onReset.bind(this);
  }

  onReset() {
    const passwordValid = this.passwordInput.valid();
    const passwordConfirmationValid = this.passwordConfirmationInput.valid();
    if (passwordValid && passwordConfirmationValid) {
      this.props.dispatchResetPassword();
    }
  }

  render() {
    const {
      dispatchChangeForm,
      password,
      passwordConfirmation,
    } = this.props;

    const refPassword = input => (this.passwordInput = input);
    const refPasswordConfirmation = input => (this.passwordConfirmationInput = input);

    return (
      <div styleName="container">
        <TextField
          ref={refPassword}
          icon={ICON_TYPE_PASSWORD}
          placeholder="新密碼"
          type="password"
          value={password}
          onChange={value => dispatchChangeForm({ password: value })}
          onEnter={this.onReset}
          constraints={constraints.password}
        />
        <TextField
          ref={refPasswordConfirmation}
          icon={ICON_TYPE_PASSWORD}
          placeholder="密碼確認"
          type="password"
          value={passwordConfirmation}
          onChange={value => dispatchChangeForm({ passwordConfirmation: value })}
          onEnter={this.onReset}
          equalityTarget={{ password }}
          constraints={constraints.passwordConfirmation}
        />
        <div className={cx('button')}>
          <FormButton
            content="完成"
            size="lg"
            onClick={this.onReset}
          />
        </div>
      </div>
    );
  }
}

export default CSS(Registering, styles);
