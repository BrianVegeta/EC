import _ from 'lodash';
import validate from 'validate.js';
import constraints from './constraints';
import { fetchZones } from '../../../../actions/addressActions';

// 服務獨有
const DELIVERY_TO_HOME = 1;
const DELIVERIED = 0;
class Assignment {
  static isOptActive(options, key) {
    return _.includes(options, key);
  }
  constructor(options, city, area, address, dispatch) {
    this.dispatch = dispatch;
    this.options = options;
    this.addresses = `${city}${area}${address}`;
    this.city = city;
    this.area = area;
    this.address = address;
    this.isToHomeActive = this.constructor.isOptActive(this.options, DELIVERY_TO_HOME);
    this.isComeToActive = this.constructor.isOptActive(this.options, DELIVERIED);
    this.optionsText = this.getOptionsText();
    this.fetchZones = this.fetchZones.bind(this);
    this.cityareaValidator = this.cityareaValidator.bind(this);
    this.addressValidator = this.addressValidator.bind(this);
    this.isRequiredAddress = this.isComeToActive;
  }
  checkToHome(checked) {
    this.isToHomeActive = checked;
    return { options: this.getOptions() };
  }
  checkComeTo(checked) {
    this.isComeToActive = checked;
    return { options: this.getOptions() };
  }
  fetchZones(cityName) {
    this.dispatch(
      fetchZones(cityName),
    );
  }
  // cityarea
  cityareaValidator() {
    const cityarea = `${this.city}${this.area}`;
    return validate.single(cityarea, constraints.cityarea);
  }
  // address
  addressValidator() {
    return validate.single(this.address, constraints.address);
  }
  isAddressesValid() {
    const isCityareaValid = _.isEmpty(this.cityareaValidator());
    const isAddressValid = _.isEmpty(this.addressValidator());
    return isAddressValid && isCityareaValid;
  }
  // options
  getOptions() {
    return [
      this.isToHomeActive ? DELIVERY_TO_HOME : '',
      this.isComeToActive ? DELIVERIED : '',
    ].join('');
  }
  getOptionsText() {
    return [
      this.isToHomeActive ? '到府服務' : '',
      this.isComeToActive ? '顧客親自前往' : '',
    ].join('、');
  }
  validatorOptions() {
    return validate.single(this.options, constraints.assignmentOptions);
  }
  validOptions(callback) {
    const errors = this.validatorOptions();
    const error = _.isEmpty(errors) ? null : errors[0];
    callback(error);
  }
  isOptionsValid() {
    return _.isEmpty(this.validatorOptions());
  }
}

export default Assignment;
