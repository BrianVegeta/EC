import { connect } from 'react-redux';
import { getEmailVerifyCode, updateEmail } from 'modules/VerifyUpdate';

import Component from './Component';


/* pick props */
const mapStateToProps = ({ environment }, { value, afterUpdateConfirm }) => ({
  environment,
  value,
  valueType: 'email',
  afterUpdateConfirm,
});

/* pick dispatch */
const mapDispatchToProps = (dispatch, { password }) => ({
  dispatchGetVerifyCode: value => dispatch(getEmailVerifyCode(value, password)),
  dispatchVerifyUpdate: verifyCode => dispatch(updateEmail(verifyCode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
