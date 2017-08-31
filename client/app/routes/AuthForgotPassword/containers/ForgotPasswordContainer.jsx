import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { login as authLogin } from 'modules/auth';
import ForgotPassword from '../components/ForgotPassword';
import {
  REDUCER_KEY as FORGOT_PASSWORD_REDUCER_KEY,
  switchRegisterByEmail,
  switchRegisterByPhone,
  registerEmail,
  registerPhone,
  verifyEmail,
  verifyPhone,
  resendEmail,
  resendPhone,
  changeForm,
  reset,
} from '../modules/forgotPassword';


/* =============================================>>>>>
= map props =
===============================================>>>>>*/
const mapStateToProps = ({
  environment,
  [FORGOT_PASSWORD_REDUCER_KEY]: forgotPassword,
}) => ({
  environment,
  forgotPassword,
});


/* =============================================>>>>>
= map dispatch =
===============================================>>>>>*/
const mapDispatchToProps = (dispatch) => {
  const afterVerified = (userProfile) => {
    dispatch(authLogin(userProfile));
    browserHistory.push('/');
  };
  const dispatchVerifyEmail = () => dispatch(verifyEmail()).then(afterVerified);
  const dispatchVerifyPhone = () => dispatch(verifyPhone()).then(afterVerified);

  return ({
    dispatchRegisterEmail: () => dispatch(registerEmail()),
    dispatchRegisterPhone: () => dispatch(registerPhone()),
    dispatchSwitchRegisterByEmail: () => dispatch(switchRegisterByEmail()),
    dispatchSwitchRegisterByPhone: () => dispatch(switchRegisterByPhone()),
    dispatchVerifyEmail,
    dispatchVerifyPhone,
    dispatchResendEmail: () => dispatch(resendEmail()),
    dispatchResendPhone: () => dispatch(resendPhone()),
    dispatchChangeForm: data => dispatch(changeForm(data)),
    dispatchReset: () => dispatch(reset()),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
