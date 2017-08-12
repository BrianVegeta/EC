import React from 'react';
import PropTypes from 'prop-types';
import {
  isFunction,
} from 'lodash';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class DropdownCities extends React.Component {
  static propTypes = {
    citiesCollection: PropTypes.arrayOf(
      PropTypes.shape({
        cityName: PropTypes.string,
        areas: PropTypes.oneOfType([
          PropTypes.func,
          PropTypes.arrayOf(PropTypes.string),
        ]),
      }),
    ).isRequired,
    onSelect: PropTypes.func.isRequired,
  };

  onSelect(city) {
    this.props.onSelect(city.cityName);
    if (isFunction(city.areas)) {
      city.areas();
    }
  }

  render() {
    const { citiesCollection } = this.props;
    return (
      <div styleName="citiesWrapper" className="clear">
        {citiesCollection.map((city, i) => (
          <div
            key={`${i + 1}`}
            role="button"
            styleName="cityContainer"
            onClick={() => this.onSelect(city)}
          >
            <div styleName="city">{city.cityName}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default CSS(DropdownCities, styles);
