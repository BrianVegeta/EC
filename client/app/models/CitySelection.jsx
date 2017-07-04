import _ from 'lodash';
import { fetchZones } from 'actions/addressActions';

export default class {
  constructor(cities, dispatch, onSelect) {
    this.onSelect = onSelect;
    this.dispatch = dispatch;
    this.cities = cities;
    this.collectedCities = this.collectCities();
  }
  onFetchZones(cityName) {
    this.dispatch(fetchZones(cityName));
  }
  collectCities() {
    return this.cities.map((cityZone) => {
      let areas = null;
      if (_.isEmpty(cityZone.zones)) {
        areas = () => this.onFetchZones(cityZone.city);
      } else {
        areas = cityZone.zones.map(zoneName => ({
          onSelect: () => this.onSelect(cityZone.city, zoneName),
          area: zoneName,
        }));
      }
      return { city: cityZone.city, areas };
    });
  }
}
