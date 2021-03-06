import { connect } from 'react-redux';

import { login as authLogin } from 'modules/auth';
import { closePopup } from 'modules/popup';
import {
  REDUCER_KEY as LOGIN_REDUCER_KEY,
  changeForm,
  switchLoginByEmail,
  switchLoginByPhone,
  loginEmail,
  loginPhone,
  loginFacebook,
  reset,
} from 'modules/login';
import { refreshHard } from 'lib/redirect';
import Login from './index';


/* =============================================>>>>>
= map props =
===============================================>>>>>*/
const mapStateToProps = ({
  environment,
  [LOGIN_REDUCER_KEY]: login,
}) => ({
  environment,
  login,
});


/* =============================================>>>>>
= map dispatch =
===============================================>>>>>*/
const mapDispatchToProps = (dispatch, { onAfterLogin }) => {
  const afterLogin = (userProfile) => {
    dispatch(authLogin(userProfile));
    dispatch(refreshHard());
    // dispatch(closePopup());
    onAfterLogin();
  };
  const dispatchLoginEmail = ({ email, password }) => {
    dispatch(
      loginEmail({ email, password }),
    ).then(afterLogin);
  };
  const dispatchLoginPhone = ({ phone, password }) => {
    dispatch(
      loginPhone({ phone, password }),
    ).then(afterLogin);
  };
  const dispatchLoginFB = ({ userID, accessToken }) => {
    dispatch(
      loginFacebook({ userID, accessToken }),
    ).then(afterLogin);
  };
  return ({
    dispatchClose: () => dispatch(closePopup()),
    dispatchChangeForm: data => dispatch(changeForm(data)),
    dispatchSwitchEmailLogin: () => dispatch(switchLoginByEmail()),
    dispatchSwitchPhoneLogin: () => dispatch(switchLoginByPhone()),
    dispatchLoginEmail,
    dispatchLoginPhone,
    dispatchLoginFB,
    dispatchReset: () => dispatch(reset()),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
