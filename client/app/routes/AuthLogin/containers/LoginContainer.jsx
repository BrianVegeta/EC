import { connect } from 'react-redux';

import { login as authLogin } from 'modules/auth';
import { redirectAfterLogin } from 'lib/redirect';
import Login from '../components/Login';
import {
  REDUCER_KEY as LOGIN_REDUCER_KEY,
  changeForm,
  switchLoginByEmail,
  switchLoginByPhone,
  loginEmail,
  loginPhone,
  loginFacebook,
  reset,
} from '../modules/login';


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
const mapDispatchToProps = (dispatch) => {
  const afterLogin = (userProfile) => {
    dispatch(authLogin(userProfile));
    dispatch(redirectAfterLogin('/'));
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
