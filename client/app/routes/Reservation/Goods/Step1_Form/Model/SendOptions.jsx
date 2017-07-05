import validate from 'validate.js';
import DeliveryOptions from 'models/DeliveryOptions';
import { changeSendOptoin } from 'actions/reservationActions';
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
      changeSendOptoin(option),
    );
  }
  validator() {
    console.log(this.value, constraints.sendOption);
    return validate.single(this.value, constraints.sendOption);
  }
}
