import React from 'react';
import PropTypes from 'prop-types';
import BackIcon from 'react-icons/lib/md/arrow-back';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class DropdownAreas extends React.Component {
  static propTypes = {
    areas: PropTypes.arrayOf(
      PropTypes.shape({
        area: PropTypes.string,
        onSelect: PropTypes.func,
      }),
    ).isRequired,
    onSelect: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    cityName: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.onBack = this.onBack.bind(this);
  }
  onSelect(areaSet) {
    const areaName = areaSet.area;
    this.props.onSelect(areaName);
    areaSet.onSelect(areaName);
  }
  onBack() { this.props.onBack(); }
  render() {
    const { areas, cityName } = this.props;
    return (
      <div styleName="areasWrapper" className="clear">
        <div styleName="cityHeader">
          <div styleName="backCitiesBtn">
            <BackIcon size={30} color="#333" onClick={this.onBack} />
          </div>
          <span styleName="cityText">{cityName}</span>
        </div>
        {areas.map((areaSet, i) =>
          <div
            {...{
              key: `${i + 1}`,
              role: 'button',
              styleName: 'areaContainer',
              onClick: () => this.onSelect(areaSet),
            }}
          >
            <div styleName="area">{areaSet.area}</div>
          </div>,
        )}
      </div>
    );
  }
}

export default CSS(DropdownAreas, styles);
