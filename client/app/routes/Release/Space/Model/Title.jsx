import validate from 'validate.js';
import _ from 'lodash';
import constraints from './constraints';
import {
  updateTitle,
} from '../../../../actions/publishActions';

class Title {
  constructor(title, dispatch) {
    this.value = title.value;
    this.dispatch = dispatch;
    this.validator = this.validator.bind(this);
    this.update = this.update.bind(this);
    this.limit = 30;
    this.length = title.length;
    this.isOverLimit = (this.length > this.limit);
  }
  validator() {
    return validate.single(this.value, constraints.title);
  }
  isValid() {
    return _.isEmpty(this.validator());
  }
  update(value) {
    this.dispatch(updateTitle(value));
  }
}
export default Title;
