import validate from 'validate.js';
import { changeFormData } from 'actions/reservationActions';
import constraints from './constraints';

export default class {

  constructor(reservation, dispatch) {
    const { note } = reservation;
    this.value = note;
    this.dispatch = dispatch;

    this.onChange = this.onChange.bind(this);
    this.validator = this.validator.bind(this);
  }

  onChange(value) {
    this.dispatch(
      changeFormData({ note: value }),
    );
  }

  validator() {
    return validate.single(this.value, constraints.note);
  }
}
