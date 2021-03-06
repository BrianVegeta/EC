import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import SelectionButton from 'components/inputs/common/SelectionButton';
import hasError from 'components/inputs/hoc/hasError';
import CitySelectionModel from 'models/CitySelection';
import { fetchCities } from 'actions/addressActions';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import Dropdown from './Dropdown';

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
    // redux provide:
    cities: myPropTypes.cities.isRequired,
    dispatch: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.closeDropdown = this.closeDropdown.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(fetchCities());
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
      dispatch,
      cities,
      onSelect,
      width,
    } = this.props;
    if (cities.length === 0) return null;
    const citySelectionModel = new CitySelectionModel(cities, dispatch, onSelect);
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
          {...{
            citiesCollection: citySelectionModel.collectedCities,
            closeDropdown: this.closeDropdown,
          }}
        />
      </SelectionButton>
    );
  }
}
const mapStateToProps = (state) => {
  const { cities } = state;
  return { cities };
};
export default connect(mapStateToProps, null, null, { withRef: true })(
  hasError(CSS(SelectionCities, styles)),
);
