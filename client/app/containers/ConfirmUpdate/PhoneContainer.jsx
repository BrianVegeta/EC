import { connect } from 'react-redux';
import { getPhoneVerifyCode, updatePhone } from 'modules/confirmUpdate';

import Component from './Component';


/* pick props */
const mapStateToProps = ({ environment }, { value, afterUpdateConfirm }) => ({
  environment,
  value,
  valueType: 'phone',
  afterUpdateConfirm,
});

/* pick dispatch */
const mapDispatchToProps = (dispatch, { password }) => ({
  dispatchGetVerifyCode: value => dispatch(getPhoneVerifyCode(value, password)),
  dispatchVerifyUpdate: verifyCode => dispatch(updatePhone(verifyCode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
