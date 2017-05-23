import React, { PropTypes } from 'react';
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
  onSelect(cityName, requestAreas) {
    this.props.onSelect(cityName);
    if (_.isFunction(requestAreas)) {
      requestAreas();
    }
  }
  render() {
    const { citiesCollection } = this.props;
    return (
      <div styleName="citiesOuter" className="clear">
        {citiesCollection.map((cityAreas, i) =>
          <div
            key={`${i + 1}`}
            styleName="cityCol"
            {...{
              role: 'button',
              onClick: () => this.onSelect(cityAreas.city, cityAreas.areas),
            }}
          >
            {cityAreas.city}
          </div>,
        )}
      </div>
    );
  }
}

export default CSS(DropdownCities, styles);
