import React from 'react';
import PropTypes from 'prop-types';

import myPropTypes from 'propTypes';
import SelectionButton from 'components/Input/SelectionBtn';
import hasError from 'components/Input/hoc/hasError';


import CSS from 'react-css-modules';
import styles from './styles.sass';
import Dropdown from './Dropdown';
import { collectCities } from './utils';

class SelectionCities extends React.Component {

  static defaultProps = {
    placeholder: '城市/地區',
    width: '100%',
    cityName: '',
    areaName: '',
    onBlur: null,
  };

  static propTypes = {
    placeholder: PropTypes.string,
    width: myPropTypes.width,
    cityName: PropTypes.string,
    areaName: PropTypes.string,
    onBlur: PropTypes.func,
    onSelect: PropTypes.func.isRequired,
    // container provide:
    dispatchFetchCities: PropTypes.func.isRequired,
    dispatchFetchAreas: PropTypes.func.isRequired,
    cities: myPropTypes.cities.isRequired,
  };

  constructor(props) {
    super(props);
    this.closeDropdown = this.closeDropdown.bind(this);
  }

  componentDidMount() {
    this.props.dispatchFetchCities();
  }

  closeDropdown() {
    this.selectBtn.closeDropdown();
  }

  render() {
    const {
      cityName,
      areaName,
      placeholder,
      onBlur,
      cities,
      onSelect,
      width,
      dispatchFetchAreas,
    } = this.props;

    if (cities.length === 0) return null;

    return (
      <SelectionButton
        {...{
          ref: sb => (this.selectBtn = sb),
          value: `${cityName}${areaName}`,
          dropdownWidth: 500,
          width,
          placeholder,
          onBlur,
        }}
      >
        <Dropdown
          onSelect={onSelect}
          closeDropdown={this.closeDropdown}
          citiesCollection={collectCities(dispatchFetchAreas, cities)}
        />
      </SelectionButton>
    );
  }
}

export default hasError(CSS(SelectionCities, styles));
