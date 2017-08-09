import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import CSS from 'react-css-modules';
import Dropdown from './Dropdown';
import styles from './styles.sass';
import SelectionButton from '../SelectionButton';

class SelectionCities extends React.Component {
  static defaultProps = {
    placeholder: '城市/地區',
    onBlur: null,
  };
  static propTypes = {
    cities: PropTypes.arrayOf(
      PropTypes.object,
    ).isRequired,
    onSelect: PropTypes.func.isRequired,
    onFetchZones: PropTypes.func.isRequired,
    cityName: PropTypes.string.isRequired,
    areaName: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onBlur: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.closeDropdown = this.closeDropdown.bind(this);
  }
  closeDropdown() {
    this.selectBtn.closeDropdown();
  }
  collectCities() {
    const { cities, onSelect, onFetchZones } = this.props;
    return cities.map((cityZone) => {
      let areas = null;
      if (_.isEmpty(cityZone.zones)) {
        areas = () => onFetchZones(cityZone.city);
      } else {
        areas = cityZone.zones.map(zoneName => ({
          onSelect: () => onSelect(cityZone.city, zoneName),
          area: zoneName,
        }));
      }
      return { city: cityZone.city, areas };
    });
  }
  render() {
    const { cityName, areaName, placeholder, onBlur } = this.props;
    const btnProps = {
      ref: sb => (this.selectBtn = sb),
      placeholder,
      value: `${cityName}${areaName}`,
      width: 290,
      dropdownWidth: 500,
      onBlur,
    };
    const dropdownProps = {
      citiesCollection: this.collectCities(),
      closeDropdown: this.closeDropdown,
    };
    return (
      <SelectionButton {...btnProps}>
        <Dropdown {...dropdownProps} />
      </SelectionButton>
    );
  }
}
export default CSS(SelectionCities, styles);
