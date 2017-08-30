import { connect } from 'react-redux';
import { getEmailVerifyCode, updateEmail } from 'modules/confirmUpdate';
import { popupAccessCheck, closePopup } from 'modules/popup';

import Component from './Component';


/* pick props */
const mapStateToProps = (
  { environment },
  { value, afterUpdateConfirm, password },
) => ({
  environment,
  value,
  valueType: 'email',
  afterUpdateConfirm,
  password,
});

/* pick dispatch */
const mapDispatchToProps = (dispatch, { password }) => {
  const accessCheck = () =>
    new Promise((resolve) => {
      dispatch(popupAccessCheck({
        onChecked(checkedPassword) {
          dispatch(closePopup());
          resolve(checkedPassword);
        },
      }));
    });

  const dispatchGetVerifyCode = (value, checkedPassword) =>
    dispatch(getEmailVerifyCode(value, checkedPassword));

  return ({
    dispatchGetVerifyCode,
    dispatchVerifyUpdate: verifyCode => dispatch(updateEmail(verifyCode)),
    dispatchCheckPassword: password ? null : accessCheck,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
