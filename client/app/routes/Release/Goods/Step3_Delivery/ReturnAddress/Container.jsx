import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import validate from 'validate.js';
import CSS from 'react-css-modules';
import { InputTextWithError, InputSelectionCitiesWithError } from '../../../components';
import { fetchZones } from '../../../../../actions/addressActions';
import {
  updateReturnAddressCityarea,
  updateReturnAddressDetail,
} from '../../../../../actions/publishActions';
import {
  INDEX_RETURN_ADDRESSES_DETAIL,
  INDEX_RETURN_ADDRESSES_CITY,
  INDEX_RETURN_ADDRESSES_AREA,
} from '../../../../../reducers/publishReducer';
import { ABOUT } from '../../../constants';
import constraints from './constraints';
import styles from './styles.sass';

class ReturnAddress extends React.Component {
  static propTypes = {
    cities: PropTypes.arrayOf(PropTypes.object).isRequired,
    dispatch: PropTypes.func.isRequired,
    publish: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string,
        PropTypes.number,
      ]),
    ).isRequired,
  };
  constructor(props) {
    super(props);
    this.onAddressDetailChange = this.onAddressDetailChange.bind(this);
    this.onCitiesChange = this.onCitiesChange.bind(this);
    this.onFetchZones = this.onFetchZones.bind(this);

    this.citiesValidator = this.citiesValidator.bind(this);
    this.addressDetailValidator = this.addressDetailValidator.bind(this);
  }
  onAddressDetailChange(text) {
    this.props.dispatch(updateReturnAddressDetail(text));
  }
  onFetchZones(cityName) {
    this.props.dispatch(fetchZones(cityName));
  }
  onCitiesChange(cityName, areaName) {
    this.props.dispatch(
      updateReturnAddressCityarea(cityName, areaName),
    );
  }
  citiesValidator() {
    const { returnAddresses } = this.props.publish;
    const cityarea = `${returnAddresses[INDEX_RETURN_ADDRESSES_CITY]}${returnAddresses[INDEX_RETURN_ADDRESSES_AREA]}`;
    return validate.single(cityarea, constraints.cityarea);
  }
  addressDetailValidator() {
    const { returnAddresses } = this.props.publish;
    const value = returnAddresses[INDEX_RETURN_ADDRESSES_DETAIL];
    return validate.single(value, constraints.addressDetail);
  }
  valid() {
    this.citiesInput.valid();
    this.addressDetailInput.valid();
  }
  render() {
    const { returnAddresses } = this.props.publish;
    const citiesProps = {
      ref: input => (this.citiesInput = input),
      cities: this.props.cities,
      placeholder: ABOUT.CITIES_PLACEHOLDER,
      onSelect: this.onCitiesChange,
      onFetchZones: this.onFetchZones,
      cityName: returnAddresses[INDEX_RETURN_ADDRESSES_CITY],
      areaName: returnAddresses[INDEX_RETURN_ADDRESSES_AREA],
      validator: this.citiesValidator,
    };
    const addressDetailProps = {
      ref: input => (this.addressDetailInput = input),
      placeholder: '請輸入',
      onChange: this.onAddressDetailChange,
      value: returnAddresses[INDEX_RETURN_ADDRESSES_DETAIL],
      validator: this.addressDetailValidator,
    };
    return (
      <div styleName="container">
        <InputSelectionCitiesWithError {...citiesProps} />
        <div styleName="addressDetailContainer">
          <InputTextWithError {...addressDetailProps} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, routesHelper, cities, publish } = state;
  return ({ environment, routesHelper, cities, publish });
};
export default connect(mapStateToProps)(CSS(ReturnAddress, styles));
