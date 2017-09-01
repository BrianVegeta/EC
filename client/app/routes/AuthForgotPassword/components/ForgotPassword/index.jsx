import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import AlertPanel from 'components/Alert/Panel';
import LoadingOverlay from 'components/Loading/Overlay';
import styles from './styles.sass';
import {
  STATE_REQUESTING,
  STATE_VERIFYING,
  STATE_RESETING,
  REQUEST_BY_EMAIL,
  REQUEST_BY_PHONE,
} from '../../modules/forgotPassword';
import PanelRequesting from '../Panel/Requesting';
import PanelVerifying from '../Panel/Verifying';
import PanelReseting from '../Panel/Reseting';


class Registration extends React.Component {

  static propTypes = {
    dispatchChangeForm: PropTypes.func.isRequired,
    dispatchReset: PropTypes.func.isRequired,
    // request
    dispatchRequest: PropTypes.func.isRequired,
    dispatchToggleRequestBy: PropTypes.func.isRequired,
    // verify
    dispatchResend: PropTypes.func.isRequired,
    dispatchVerify: PropTypes.func.isRequired,
    // reset
    dispatchResetPassword: PropTypes.func.isRequired,

    forgotPassword: PropTypes.shape({
      state: PropTypes.oneOf([
        STATE_REQUESTING,
        STATE_VERIFYING,
        STATE_RESETING,
      ]).isRequired,
      requestBy: PropTypes.oneOf([
        REQUEST_BY_EMAIL,
        REQUEST_BY_PHONE,
      ]).isRequired,
      form: PropTypes.shape({
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        passwordConfirmation: PropTypes.string.isRequired,
        verifyCode: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  static renderErrorMessage(errorMessage) {
    if (!errorMessage) return null;
    return <AlertPanel text={errorMessage} />;
  }

  static renderLoading(isLoading) {
    if (!isLoading) return null;
    return <LoadingOverlay />;
  }

  componentDidMount() {
    this.props.dispatchReset();
  }

  render() {
    const {
      forgotPassword: {
        isLoading,
        errorMessage,
        requestBy,
        state,
        form: {
          email,
          phone,
          password,
          passwordConfirmation,
          verifyCode,
        },
      },
      dispatchRequest,
      dispatchChangeForm,
      dispatchToggleRequestBy,
      dispatchResend,
      dispatchVerify,
      dispatchResetPassword,
    } = this.props;
    const {
      renderErrorMessage,
      renderLoading,
    } = this.constructor;
    return (
      <div styleName="container">
        {renderErrorMessage(errorMessage)}
        {renderLoading(isLoading)}
        {{
          [STATE_REQUESTING]: (
            <PanelRequesting
              dispatchRequest={dispatchRequest}
              dispatchToggleRequestBy={dispatchToggleRequestBy}
              dispatchChangeForm={dispatchChangeForm}
              requestBy={requestBy}
              phone={phone}
              email={email}
            />
          ),
          [STATE_VERIFYING]: (
            <PanelVerifying
              dispatchResend={dispatchResend}
              dispatchVerify={dispatchVerify}
              requestBy={requestBy}
              email={email}
              phone={phone}
              verifyCode={verifyCode}
              dispatchChangeForm={dispatchChangeForm}
            />
          ),
          [STATE_RESETING]: (
            <PanelReseting
              dispatchChangeForm={dispatchChangeForm}
              dispatchResetPassword={dispatchResetPassword}
              password={password}
              passwordConfirmation={passwordConfirmation}
            />
          ),
        }[state]}
      </div>
    );
  }
}

export default CSS(Registration, styles);
