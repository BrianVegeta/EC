import React, { PropTypes } from 'react';
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
    city: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.onBackToCities = this.onBackToCities.bind(this);
  }
  onSelect(areaSet) {
    const areaName = areaSet.area;
    this.props.onSelect(areaName);
    areaSet.onSelect(areaName);
  }
  onBackToCities() {
    this.props.onBack();
  }
  render() {
    const { areas, city } = this.props;
    return (
      <div styleName="citiesOuter" className="clear">
        <div styleName="cityHeader">
          <div styleName="backCitiesBtn">
            <BackIcon size={30} color="#333" onClick={this.onBackToCities} />
          </div>
          <span styleName="cityText">{city}</span>
        </div>
        {areas.map((areaSet, i) =>
          <div
            key={`${i + 1}`}
            styleName="cityCol"
            {...{
              role: 'button',
              onClick: () => this.onSelect(areaSet),
            }}
          >
            {areaSet.area}
          </div>,
        )}
      </div>
    );
  }
}

export default CSS(DropdownAreas, styles);
