import validate from 'validate.js';
import { changeSendCityarea, changeSendAddress } from 'actions/reservationActions';
import Addresses from 'models/Addresses';
import constraints from './constraints';

export default class extends Addresses {

  constructor(inputProps, dispatch) {
    const { sendCity, sendArea, sendAddress } = inputProps;
    super(
      sendCity,
      sendArea,
      sendAddress,
      dispatch,
    );

    this.onCityareaSelect = this.onCityareaSelect.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);

    this.cityareaValidator = this.cityareaValidator.bind(this);
    this.addressValidator = this.addressValidator.bind(this);
  }

  cityareaValidator() {
    return validate.single(`${this.cityName}${this.areaName}`, constraints.sendCityArea);
  }

  addressValidator() {
    return validate.single(this.address, constraints.sendAddress);
  }

  onCityareaSelect(cityName, areaName) {
    this.dispatch(
      changeSendCityarea(cityName, areaName),
    );
  }

  onAddressChange(address) {
    this.dispatch(
      changeSendAddress(address),
    );
  }
}
