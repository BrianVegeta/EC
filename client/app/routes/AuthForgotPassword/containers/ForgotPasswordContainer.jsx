import { connect } from 'react-redux';
import swal, { successConfig } from 'lib/swal';
import ForgotPassword from '../components/ForgotPassword';
import {
  REDUCER_KEY as FORGOT_PASSWORD_REDUCER_KEY,
  getVerifyCode,
  resendVerifyCode,
  toggleRequestBy,
  verify,
  resetPassword,
  changeForm,
  reset,
} from '../modules/forgotPassword';

//
// forgotPassword: PropTypes.shape({
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
  const dispatchRequest = () => dispatch(getVerifyCode());
  const dispatchToggleRequestBy = () => dispatch(toggleRequestBy());
  const dispatchResend = () => dispatch(resendVerifyCode());
  const dispatchVerify = () => dispatch(verify());
  const dispatchResetPassword = () => dispatch(resetPassword()).then(() => {
    swal(successConfig({
      title: '成功變更密碼',
      text: '系統將自動登入',
    }));
  });

  return ({
    dispatchChangeForm: data => dispatch(changeForm(data)),
    dispatchRequest,
    dispatchToggleRequestBy,
    dispatchResend,
    dispatchVerify,
    dispatchResetPassword,
    dispatchReset: () => dispatch(reset()),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
