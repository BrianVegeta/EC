import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import {
  isArray,
} from 'lodash';

import DropdownCities from './DropdownCities';
import DropdownAreas from './DropdownAreas';
import styles from './styles.sass';
import { findAreas } from '../utils';

class Dropdown extends React.Component {
  static propTypes = {
    citiesCollection: PropTypes.arrayOf(
      PropTypes.shape({
        city: PropTypes.string,
        areas: PropTypes.oneOfType([
          PropTypes.func,
          PropTypes.arrayOf(PropTypes.string),
        ]),
      }),
    ).isRequired,
    onSelect: PropTypes.func.isRequired,
    closeDropdown: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.onCitySelect = this.onCitySelect.bind(this);
    this.state = {
      cityName: null,
    };
  }

  onCitySelect(cityName) {
    this.setState({ cityName });
  }

  render() {
    const { cityName } = this.state;
    const { citiesCollection } = this.props;
    const areas = cityName ? findAreas(cityName, citiesCollection) : [];

    if (isArray(areas) && areas.length > 0) {
      return (
        <DropdownAreas
          areas={areas}
          cityName={this.state.cityName}
          onSelect={this.props.onSelect}
          closeDropdown={this.props.closeDropdown}
          onBack={() => this.setState({ cityName: null })}
        />
      );
    }
    return (
      <DropdownCities
        citiesCollection={this.props.citiesCollection}
        onSelect={this.onCitySelect}
      />
    );
  }
}

export default CSS(Dropdown, styles);
