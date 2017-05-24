import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CSS from 'react-css-modules';
import _ from 'lodash';
import { InputText, InputSelectionCities } from '../../../components';
import { fetchZones } from '../../../../../actions/addressActions';
import styles from './styles.sass';

class ReturnAddress extends React.Component {
  static propTypes = {
    cities: PropTypes.arrayOf(PropTypes.object).isRequired,
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
      <div styleName="container">
        <InputSelectionCities citiesCollection={citiesCollection} />
        <div styleName="addressDetailContainer">
          <InputText placeholder="請輸入" value="" onChange={this.onAddressChange} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, routesHelper, cities } = state;
  return ({ environment, routesHelper, cities });
};
export default connect(mapStateToProps)(CSS(ReturnAddress, styles));
