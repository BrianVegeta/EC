import _ from 'lodash';
import validate from 'validate.js';
import constraints from './constraints';
import { fetchZones } from '../../../../actions/addressActions';
import {
  updateAssignCityarea,
  updateAssignAddress,
} from '../../../../actions/publishActions';

// 空間
class Assignment {
  constructor(city, area, address, dispatch) {
    this.dispatch = dispatch;
    this.addresses = `${city}${area}${address}`;
    this.city = city;
    this.area = area;
    this.address = address;

    this.fetchZones = this.fetchZones.bind(this);
    this.cityareaValidator = this.cityareaValidator.bind(this);
    this.updateCityarea = this.updateCityarea.bind(this);
    this.addressValidator = this.addressValidator.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
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
  updateCityarea(cityName, areaName) {
    this.dispatch(updateAssignCityarea(cityName, areaName));
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
  updateAddress(address) {
    this.dispatch(updateAssignAddress(address));
  }
}

export default Assignment;
