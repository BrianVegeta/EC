import _ from 'lodash';
import validate from 'validate.js';
import constraints from './constraints';
import { fetchZones, fetchCities } from '../../../../actions/addressActions';
import { updateCityArea } from '../../../../actions/publishActions';

class Cityarea {
  constructor(city, area, dispatch) {
    this.city = city;
    this.area = area;
    this.dispatch = dispatch;
    this.cityarea = `${city}${area}`;
    this.validator = this.validator.bind(this);
    this.update = this.update.bind(this);
    this.fetchZones = this.fetchZones.bind(this);
    this.fetchCities = this.fetchCities.bind(this);
  }
  validator() {
    return validate.single(this.cityarea, constraints.cityarea);
  }
  isValid() {
    return _.isEmpty(this.validator());
  }
  update(cityName, areaName) {
    this.dispatch(updateCityArea(cityName, areaName));
  }
  fetchZones(cityName) {
    this.dispatch(fetchZones(cityName));
  }
  fetchCities() {
    this.dispatch(fetchCities());
  }
}
export default Cityarea;
