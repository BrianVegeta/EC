import React, { PropTypes } from 'react';
import _ from 'lodash';
import InputSelectionCities from '../../../components/InputSelectionCities';
import { fetchZones } from '../../../../../actions/addressActions';

class ReturnAddress extends React.Component {
  static propTypes = {
    cities: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  };
  onCityAreaSelect(cityName, areaName) {
    console.log(cityName, areaName);
  }
  getZones(cityName) {
    this.props.dispatch(fetchZones(cityName));
  }
  collectCities() {
    return this.props.cities.map((cityZone) => {
      let areas = null;
      if (_.isEmpty(cityZone.zones)) {
        areas = () => this.getZones(cityZone.city);
      } else {
        areas = cityZone.zones.map(zoneName => ({
          onSelect: () => this.onCityAreaSelect(cityZone.city, zoneName),
          area: zoneName,
        }));
      }
      return { city: cityZone.city, areas };
    });
  }
  render() {
    const citiesCollection = this.collectCities();
    return (
      <div>
        <InputSelectionCities citiesCollection={citiesCollection} />
      </div>
    );
  }
}

export default ReturnAddress;
