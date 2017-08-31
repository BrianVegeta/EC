import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import {
  STATE_REGISTERING,
  STATE_VERIFYING,
  REGISTER_BY_EMAIL,
  REGISTER_BY_PHONE,
} from '../../modules/forgotPassword';
import PanelRequesting from '../Panel/Requesting';
import PanelVerifying from '../Panel/Verifying';
import PanelReseting from '../Panel/Reseting';


class Registration extends React.Component {

  static propTypes = {
    dispatchChangeForm: PropTypes.func.isRequired,
    dispatchReset: PropTypes.func.isRequired,
    // verify
    dispatchResendEmail: PropTypes.func.isRequired,
    dispatchResendPhone: PropTypes.func.isRequired,
    dispatchVerifyEmail: PropTypes.func.isRequired,
    dispatchVerifyPhone: PropTypes.func.isRequired,
    // register
    dispatchRegisterEmail: PropTypes.func.isRequired,
    dispatchRegisterPhone: PropTypes.func.isRequired,
    dispatchSwitchRegisterByEmail: PropTypes.func.isRequired,
    dispatchSwitchRegisterByPhone: PropTypes.func.isRequired,

    registration: PropTypes.shape({
      state: PropTypes.oneOf([STATE_REGISTERING, STATE_VERIFYING]).isRequired,
      registerBy: PropTypes.oneOf([REGISTER_BY_EMAIL, REGISTER_BY_PHONE]).isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      passwordConfirmation: PropTypes.string.isRequired,
      nickname: PropTypes.string.isRequired,
      verifyCode: PropTypes.string.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    this.props.dispatchReset();
  }

  render() {
    const {
      registration,
      dispatchRegisterEmail,
      dispatchRegisterPhone,
      dispatchSwitchRegisterByEmail,
      dispatchSwitchRegisterByPhone,
      dispatchVerifyEmail,
      dispatchVerifyPhone,
      dispatchResendEmail,
      dispatchResendPhone,
      dispatchChangeForm,
    } = this.props;
    return (
      <div styleName="container">
        {{
          [STATE_REGISTERING]: (
            <Registering
              dispatchRegisterEmail={dispatchRegisterEmail}
              dispatchRegisterPhone={dispatchRegisterPhone}
              dispatchSwitchRegisterByEmail={dispatchSwitchRegisterByEmail}
              dispatchSwitchRegisterByPhone={dispatchSwitchRegisterByPhone}
              dispatchChangeForm={dispatchChangeForm}
              registration={registration}
            />
          ),
          [STATE_VERIFYING]: (
            <Verifying
              dispatchVerifyEmail={dispatchVerifyEmail}
              dispatchVerifyPhone={dispatchVerifyPhone}
              dispatchResendEmail={dispatchResendEmail}
              dispatchResendPhone={dispatchResendPhone}
              dispatchChangeForm={dispatchChangeForm}
              registration={registration}
            />
          ),
        }[registration.state]}
      </div>
    );
  }
}

export default CSS(Registration, styles);
