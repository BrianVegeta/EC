import validate from 'validate.js';
import DeliveryOptions from 'models/DeliveryOptions';
import { changeSendOptoin } from 'actions/reservationActions';
import constraints from './constraints';

export default class extends DeliveryOptions {
  constructor(detail, input, dispatch) {
    super(detail, dispatch);
    this.value = input;

    this.onSelect = this.onSelect.bind(this);
    this.validator = this.validator.bind(this);
    this.singleOptionToUpdate = this.singleOptionToUpdate.bind(this);

    this.needAddresses = this.constructor.checkAddressesNecessary(input);
  }

  onSelect(option) {
    this.dispatch(
      changeSendOptoin(
        this.constructor.valueFromOption(option),
      ),
    );
  }

  validator() {
    return validate.single(this.value, constraints.sendOption);
  }

  singleOptionToUpdate() {
    this.dispatch(
      changeSendOptoin(this.option),
    );
  }
}
