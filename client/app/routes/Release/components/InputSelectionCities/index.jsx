import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import _ from 'lodash';
import DropdownCities from './DropdownCities';
import DropdownAreas from './DropdownAreas';
import styles from './styles.sass';

class SelectionCities extends React.Component {
  static defaultProps = {
    cities: null,
    placeholder: null,
  };
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
    placeholder: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onCitySelect = this.onCitySelect.bind(this);
    this.onAreaSelect = this.onAreaSelect.bind(this);
    this.onBackToCities = this.onBackToCities.bind(this);
    this.state = {
      isFocusing: true,
      selectedCityName: null,
    };
  }
  onBlur() {
    this.setState({ isFocusing: true });
  }
  onFocus() {
    this.setState({ isFocusing: true });
  }
  onCitySelect(cityName) {
    this.setState({ selectedCityName: cityName });
  }
  onAreaSelect(areaName) {
    this.setState({ isFocusing: false });
    console.log('area select', this.state.selectedCityName, areaName);
  }
  onBackToCities() {
    this.setState({ selectedCityName: null });
  }
  getAreasFromCities() {
    const { citiesCollection } = this.props;
    const { selectedCityName } = this.state;
    const selectedCity = _.find(citiesCollection, { city: selectedCityName });
    return selectedCity.areas;
  }
  render() {
    const { isFocusing, selectedCityName } = this.state;
    const { placeholder, citiesCollection } = this.props;
    const { onFocus, onBlur } = this;
    return (
      <button
        styleName={isFocusing ? 'inputFocusing' : 'input'}
        {...{ onFocus, onBlur }}
        className="button"
      >
        <div styleName="innerWrapper">{placeholder}</div>
        {
          isFocusing && citiesCollection &&
          <div styleName="dropdown">
            { selectedCityName &&
              _.isArray(this.getAreasFromCities()) &&
              this.getAreasFromCities().length > 0 ?
                <DropdownAreas
                  areas={this.getAreasFromCities()}
                  onSelect={this.onAreaSelect}
                  onBack={this.onBackToCities}
                  city={selectedCityName}
                /> :
                <DropdownCities {...{ citiesCollection }} onSelect={this.onCitySelect} />
            }
          </div>
        }
      </button>
    );
  }
}
export default CSS(SelectionCities, styles);
