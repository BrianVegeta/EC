import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CSS from 'react-css-modules';
import _ from 'lodash';
import { InputText, InputSelectionCities } from '../../../components';
import { fetchZones } from '../../../../../actions/addressActions';
import {
  updateReturnAddressCityarea,
  updateReturnAddressDetail,
} from '../../../../../actions/publishActions';
import {
  INDEX_RETURN_ADDRESSES_DETAIL,
  INDEX_RETURN_ADDRESSES_CITY,
  INDEX_RETURN_ADDRESSES_AREA,
} from '../../../../../reducers/publishReducer';

import styles from './styles.sass';

class ReturnAddress extends React.Component {
  static propTypes = {
    cities: PropTypes.arrayOf(PropTypes.object).isRequired,
    dispatch: PropTypes.func.isRequired,
    publish: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.onAddressDetailChange = this.onAddressDetailChange.bind(this);
  }
  onAddressDetailChange(text) {
    this.props.dispatch(updateReturnAddressDetail(text));
  }
  collectCities() {
    const { dispatch } = this.props;
    const getZones = (cityName) => {
      dispatch(fetchZones(cityName));
    };
    const onCityAreaSelect = (cityName, areaName) => {
      dispatch(updateReturnAddressCityarea(cityName, areaName));
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
    const { returnAddresses } = this.props.publish;
    return (
      <div styleName="container">
        <InputSelectionCities
          citiesCollection={citiesCollection}
          cityName={returnAddresses[INDEX_RETURN_ADDRESSES_CITY]}
          areaName={returnAddresses[INDEX_RETURN_ADDRESSES_AREA]}
        />
        <div styleName="addressDetailContainer">
          <InputText
            placeholder="請輸入"
            value={returnAddresses[INDEX_RETURN_ADDRESSES_DETAIL]}
            onChange={this.onAddressDetailChange}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, routesHelper, cities, publish } = state;
  return ({ environment, routesHelper, cities, publish });
};
export default connect(mapStateToProps)(CSS(ReturnAddress, styles));
