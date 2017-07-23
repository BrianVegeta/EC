/* eslint-disable class-methods-use-this */
import validate from 'validate.js';
import _ from 'lodash';
import constraints from '../../constraints';

class Attribute {
  constructor(props, dispatch) {
    this.value = props;
    this.dispatch = dispatch;
    this.update = this.update.bind(this);
    this.validator = this.validator.bind(this);
    this.isValid = this.isValid();
  }
  getAttributeName() {
    return null;
  }
  getUpdateAction() {
    return null;
  }
  getConstraints() {
    return constraints[this.getAttributeName()];
  }
  update(value) {
    this.dispatch(this.getUpdateAction()(value));
  }
  validator() {
    return validate.single(this.value, this.getConstraints());
  }
  isValid() {
    return _.isEmpty(this.validator());
  }
}
export default Attribute;
