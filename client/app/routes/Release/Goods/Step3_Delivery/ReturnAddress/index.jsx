import React, { PropTypes } from 'react';
import _ from 'lodash';
import InputSelectionCities from '../../../components/InputSelectionCities';
import InputText from '../../../components/InputText';
import { fetchZones } from '../../../../../actions/addressActions';

class ReturnAddress extends React.Component {
  static propTypes = {
    cities: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.onAddressChange = this.onAddressChange.bind(this);
  }
  onAddressChange(text) {
    console.log(text);
  }
  collectCities() {
    const getZones = (cityName) => {
      this.props.dispatch(fetchZones(cityName));
    };
    const onCityAreaSelect = (cityName, areaName) => {
      console.log(cityName, areaName);
    };
    return this.props.cities.map((cityZone) => {
      let areas = null;
      if (_.isEmpty(cityZone.zones)) {
        areas = () => getZones(cityZone.city);
      } else {
        areas = cityZone.zones.map(zoneName => ({
          onSelect: () => onCityAreaSelect(cityZone.city, zoneName),
          area: zoneName,
        }));
      }
      return { city: cityZone.city, areas };
    });
  }
  render() {
    const citiesCollection = this.collectCities();
    return (
      <div style={{ marginLeft: 28, marginTop: 10 }} >
        <InputSelectionCities citiesCollection={citiesCollection} />
        <div style={{ marginTop: 20 }}>
          <InputText placeholder="請輸入" value="" onChange={this.onAddressChange} />
        </div>
      </div>
    );
  }
}

export default ReturnAddress;
