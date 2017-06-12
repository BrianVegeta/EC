import _ from 'lodash';
import validate from 'validate.js';
import {
  updateRegulation,
} from '../../../../actions/publishActions';
import constraints from './constraints';

class Regulation {
  constructor(regulation, dispatch) {
    this.value = regulation;
    this.dispatch = dispatch;
    this.update = this.update.bind(this);
    this.validator = this.validator.bind(this);
    this.isSettedUp = !_.isEmpty(this.value);
  }
  validator() {
    return validate.single(this.value, constraints.regulation);
  }
  isValid() {
    return _.isEmpty(this.validator());
  }
  update(value) {
    this.dispatch(updateRegulation(value));
  }
}
export default Regulation;
