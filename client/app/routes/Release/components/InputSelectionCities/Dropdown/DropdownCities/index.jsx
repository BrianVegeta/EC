import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class DropdownCities extends React.Component {
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
    onSelect: PropTypes.func.isRequired,
  };
  onSelect(cityAreas) {
    this.props.onSelect(cityAreas.city);
    if (_.isFunction(cityAreas.areas)) { cityAreas.areas(); }
  }
  render() {
    const { citiesCollection } = this.props;
    return (
      <div styleName="citiesWrapper" className="clear">
        {citiesCollection.map((cityAreas, i) =>
          <div
            {...{
              key: `${i + 1}`,
              role: 'button',
              styleName: 'cityContainer',
              onClick: () => this.onSelect(cityAreas),
            }}
          >
            <div styleName="city">{cityAreas.city}</div>
          </div>,
        )}
      </div>
    );
  }
}

export default CSS(DropdownCities, styles);
