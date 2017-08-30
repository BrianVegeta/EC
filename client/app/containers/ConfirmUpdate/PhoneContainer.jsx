import { connect } from 'react-redux';
import { getPhoneVerifyCode, updatePhone } from 'modules/confirmUpdate';
import { popupAccessCheck, closePopup } from 'modules/popup';

import Component from './Component';


/* pick props */
const mapStateToProps = (
  { environment },
  { value, afterUpdateConfirm, password },
) => ({
  environment,
  value,
  valueType: 'phone',
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
    dispatch(getPhoneVerifyCode(value, checkedPassword));

  return ({
    dispatchGetVerifyCode,
    dispatchVerifyUpdate: verifyCode => dispatch(updatePhone(verifyCode)),
    dispatchCheckPassword: password ? null : accessCheck,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
