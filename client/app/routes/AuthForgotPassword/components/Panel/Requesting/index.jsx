import React from 'react';
import PropTypes from 'prop-types';

import TextField, {
  ICON_TYPE_PHONE,
  ICON_TYPE_EMAIL,
} from 'components/Input/TextField';
import FormButton from 'components/FormButton';
import constraints from 'constraints';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import {
  REQUEST_BY_PHONE,
  REQUEST_BY_EMAIL,
} from '../../../modules/forgotPassword';


const cx = classnames.bind(styles);
class Registering extends React.Component {

  static propTypes = {
    dispatchRequest: PropTypes.func.isRequired,
    dispatchToggleRequestBy: PropTypes.func.isRequired,
    dispatchChangeForm: PropTypes.func.isRequired,

    requestBy: PropTypes.oneOf([
      REQUEST_BY_EMAIL,
      REQUEST_BY_PHONE,
    ]).isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.onRequest = this.onRequest.bind(this);
  }

  onRequest() {
    const loginValid = this.loginInput.valid();
    if (loginValid) {
      this.props.dispatchRequest();
    }
  }

  render() {
    const {
      dispatchToggleRequestBy,
      dispatchChangeForm,
      requestBy,
      email,
      phone,
    } = this.props;
    const refLogin = loginInput => (this.loginInput = loginInput);
    return (
      <div styleName="container">
        {{
          [REQUEST_BY_EMAIL]: (
            <TextField
              ref={refLogin}
              icon={ICON_TYPE_EMAIL}
              placeholder="Email"
              value={email}
              onChange={value => dispatchChangeForm({ email: value })}
              onEnter={this.onRequest}
              constraints={constraints.email}
            />
          ),
          [REQUEST_BY_PHONE]: (
            <TextField
              ref={refLogin}
              icon={ICON_TYPE_PHONE}
              placeholder="手機號碼"
              value={phone}
              onChange={value => dispatchChangeForm({ phone: value })}
              onEnter={this.onRequest}
              constraints={constraints.phone}
            />
          ),
        }[requestBy]}
        <div className={cx('button')}>
          <FormButton
            content="發送驗證碼"
            size="lg"
            onClick={this.onRequest}
          />
        </div>
        <div className={cx('button', 'bottom')}>
          <FormButton
            content={{
              [REQUEST_BY_EMAIL]: '使用手機收取驗證碼',
              [REQUEST_BY_PHONE]: '使用 Email 收取驗證碼',
            }[requestBy]}
            colorType="greenBorder"
            size="lg"
            onClick={dispatchToggleRequestBy}
          />
        </div>
      </div>
    );
  }
}

export default CSS(Registering, styles);
