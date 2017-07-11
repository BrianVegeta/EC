import validate from 'validate.js';
import DeliveryOptions from 'models/DeliveryOptions';
import { changeReturnOption } from 'actions/reservationActions';
import constraints from './constraints';

export default class extends DeliveryOptions {
  constructor(detail, input, dispatch) {
    super(detail, dispatch);
    this.value = input;

    this.onSelect = this.onSelect.bind(this);
    this.validator = this.validator.bind(this);
    this.singleOptionToUpdate = this.singleOptionToUpdate.bind(this);

    // reservation
    this.choosedOption = super.getOptionFromValue(input);
    this.choosedDesc = this.choosedOption.text;
    this.choosedHelper = super.constructor.choosingMail(input) ? '當您提交預訂單後，分享人會提供給您寄還的地點' : null;
  }

  onSelect(option) {
    this.dispatch(
      changeReturnOption(
        this.constructor.valueFromOption(option),
      ),
    );
  }

  validator() {
    return validate.single(this.value, constraints.returnOption);
  }

  singleOptionToUpdate() {
    this.dispatch(
      changeReturnOption(this.option),
    );
  }
}
