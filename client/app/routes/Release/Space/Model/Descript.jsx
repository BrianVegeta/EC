import validate from 'validate.js';
import _ from 'lodash';
import constraints from './constraints';
import {
  updateDesc,
} from '../../../../actions/publishActions';

class Descript {
  constructor(descript, dispatch) {
    this.value = descript.value;
    this.dispatch = dispatch;
    this.validator = this.validator.bind(this);
    this.update = this.update.bind(this);
    this.limit = 250;
    this.length = this.value.replace(/\n/g, '').length;
    this.isOverLimit = (this.length > this.limit);
  }
  validator() {
    return validate.single(this.value, constraints.descript);
  }
  isValid() {
    return _.isEmpty(this.validator());
  }
  update(value) {
    this.dispatch(updateDesc(value));
  }
}
export default Descript;
