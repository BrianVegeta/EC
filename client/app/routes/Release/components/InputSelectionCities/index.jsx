import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import Dropdown from './Dropdown';
import styles from './styles.sass';
import SelectionButton from '../SelectionButton';

class SelectionCities extends React.Component {
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
    cityName: PropTypes.string.isRequired,
    areaName: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.closeDropdown = this.closeDropdown.bind(this);
  }
  closeDropdown() {
    this.selectBtn.closeDropdown();
  }
  render() {
    const { citiesCollection, cityName, areaName } = this.props;
    const { closeDropdown } = this;
    return (
      <SelectionButton
        ref={sb => (this.selectBtn = sb)}
        placeholder="城市/地區"
        value={`${cityName}${areaName}`}
        width={300}
      >
        <Dropdown {...{ citiesCollection, closeDropdown }} />
      </SelectionButton>
    );
  }
}
export default CSS(SelectionCities, styles);
