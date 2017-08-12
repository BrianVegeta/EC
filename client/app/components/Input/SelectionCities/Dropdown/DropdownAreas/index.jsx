import React from 'react';
import PropTypes from 'prop-types';
import BackIcon from 'react-icons/lib/md/arrow-back';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class DropdownAreas extends React.Component {

  static propTypes = {
    areas: PropTypes.arrayOf(
      PropTypes.string,
    ).isRequired,
    cityName: PropTypes.string.isRequired,
    closeDropdown: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  };

  onSelect({ cityName, areaName }) {
    const { onSelect, closeDropdown } = this.props;
    onSelect({ cityName, areaName });
    closeDropdown();
  }

  render() {
    const { areas, cityName, onBack } = this.props;
    return (
      <div styleName="areasWrapper" className="clear">
        <div styleName="cityHeader">
          <div styleName="backCitiesBtn">
            <BackIcon size={30} color="#333" onClick={onBack} />
          </div>
          <span styleName="cityText">{cityName}</span>
        </div>
        {areas.map((areaName, i) => (
          <div
            key={`${i + 1}`}
            role="button"
            styleName="areaContainer"
            onClick={() => this.onSelect({ cityName, areaName })}
          >
            <div styleName="area">{areaName}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default CSS(DropdownAreas, styles);
