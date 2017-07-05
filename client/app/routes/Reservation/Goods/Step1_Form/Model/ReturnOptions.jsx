import validate from 'validate.js';
import DeliveryOptions from 'models/DeliveryOptions';
import { changeReturnOption } from 'actions/reservationActions';
import constraints from './constrains';

export default class extends DeliveryOptions {
  constructor(detail, input, dispatch) {
    super(detail, dispatch);
    this.value = input;
    this.onSelect = this.onSelect.bind(this);
    this.validator = this.validator.bind(this);
  }
  onSelect(option) {
    this.dispatch(
      changeReturnOption(option),
    );
  }
  validator() {
    return validate.single(this.value, constraints.returnOption);
  }
}
