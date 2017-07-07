import { changeAmount } from 'actions/reservationActions';
import validate from 'validate.js';
import constraints from './constraints';

export default class {
  constructor(detail, reservation, dispatch) {
    this.dispatch = dispatch;
    this.value = reservation.amount;
    this.remainder = detail.unit;

    this.onChange = this.onChange.bind(this);
    this.validator = this.validator.bind(this);
  }

  validator() {
    return validate.single(this.value, constraints.amount);
  }

  onChange(value) {
    this.dispatch(
      changeAmount(value),
    );
  }
}
