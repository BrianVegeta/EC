import { connect } from 'react-redux';
import {
  checkPasswordExist,
  reset,
  changeState,
  checkPassword,
  createPassword,
} from 'modules/access';
import { closePopup } from 'modules/popup';
import Component from './index';

/* pick props */
const mapStateToProps = ({ environment, access }) => {
  return ({
    environment,
    access,
  });
};

/* pick dispatch */
const mapDispatchToProps = (dispatch) => {
  const dispatchCreatePassword = (password, onChecked) =>
    dispatch(createPassword(password, onChecked));
  const dispatchCheckPassword = (password, onChecked) =>
    dispatch(checkPassword(password, onChecked));

  return ({
    dispatchResetAccess: () => dispatch(reset()),
    dispatchCheckPasswordExist: () => console.log('check password exist '),
    dispatchChangePassword: data => dispatch(changeState(data)),
    dispatchCreatePassword,
    dispatchCheckPassword,
    dispatchClosePopup: () => dispatch(closePopup()),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
