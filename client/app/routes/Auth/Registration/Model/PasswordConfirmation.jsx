/* eslint-disable class-methods-use-this */
import _ from 'lodash';
import validate from 'validate.js';
import { updatePasswordConfirmation } from '../../../../actions/authActions';
import constraints from './constraints';

class PasswordConfirmation {
  constructor(props, password, dispatch) {
    this.value = props;
    this.password = password;
    this.dispatch = dispatch;
    this.update = this.update.bind(this);
    this.validator = this.validator.bind(this);
    this.isValid = this.isValid();
  }
  getAttributeName() {
    return 'passwordConfirmation';
  }
  getUpdateAction() {
    return updatePasswordConfirmation;
  }
  update(value) {
    this.dispatch(updatePasswordConfirmation(value));
  }
  validator() {
    const errors = validate({
      password: this.password,
      passwordConfirmation: this.value,
    }, constraints);
    return errors ? errors.passwordConfirmation : errors;
  }
  isValid() {
    return _.isEmpty(this.validator());
  }
}
export default PasswordConfirmation;
