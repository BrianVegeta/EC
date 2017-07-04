import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import _ from 'lodash';
import DropdownCities from './DropdownCities';
import DropdownAreas from './DropdownAreas';
import styles from './styles.sass';

class Dropdown extends React.Component {
  static propTypes = {
    citiesCollection: PropTypes.arrayOf(
      PropTypes.shape({
        city: PropTypes.string,
        areas: PropTypes.oneOfType([
          PropTypes.func,
          PropTypes.arrayOf(
            PropTypes.shape({
              area: PropTypes.string,
              onSelect: PropTypes.func,
            }),
          ),
        ]),
      }),
    ).isRequired,
    closeDropdown: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.onAreaSelect = this.onAreaSelect.bind(this);
    this.onCitySelect = this.onCitySelect.bind(this);
    this.emptyCity = this.emptyCity.bind(this);
    this.state = { cityName: null };
  }
  onAreaSelect() {
    this.props.closeDropdown();
  }
  onCitySelect(cityName) { this.setState({ cityName }); }
  getCityAreas(cityName) {
    if (!cityName) { return []; }
    const { citiesCollection } = this.props;
    return _.find(citiesCollection, { city: cityName }).areas;
  }
  emptyCity() { this.setState({ cityName: null }); }
  render() {
    const { cityName } = this.state;
    const { citiesCollection } = this.props;
    const areas = this.getCityAreas(cityName);
    if (_.isArray(areas) && areas.length > 0) {
      return (
        <DropdownAreas
          {...{
            areas,
            cityName,
            onSelect: this.onAreaSelect,
            onBack: this.emptyCity,
          }}
        />
      );
    }
    return (
      <DropdownCities
        {...{
          citiesCollection,
          onSelect: this.onCitySelect,
        }}
      />
    );
  }
}

export default CSS(Dropdown, styles);
