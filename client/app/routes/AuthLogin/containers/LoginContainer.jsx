import { connect } from 'react-redux';

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
  const dispatchLoginEmail = ({ email, password }) => {
    dispatch(loginEmail({ email, password }));
  };
  const dispatchLoginPhone = ({ phone, password }) => {
    dispatch(loginPhone({ phone, password }));
  };
  const dispatchLoginFB = ({ userID, accessToken }) => {
    dispatch(loginFacebook({ userID, accessToken }));
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
