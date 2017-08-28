import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { login as authLogin } from 'modules/auth';
import Registration from '../components/Registration';
import {
  REDUCER_KEY as REGISTRATION_REDUCER_KEY,
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
} from '../modules/registration';


/* =============================================>>>>>
= map props =
===============================================>>>>>*/
const mapStateToProps = ({
  environment,
  [REGISTRATION_REDUCER_KEY]: registration,
}) => ({
  environment,
  registration,
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

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
