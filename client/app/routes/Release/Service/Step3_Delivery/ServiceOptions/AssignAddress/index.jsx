import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import {
  InputTextWithError,
  InputSelectionCitiesWithError,
} from '../../../../components';
import {
  updateAssignCityarea,
  updateAssignAddress,
} from '../../../../../../actions/publishActions';
import styles from './styles.sass';

class ReturnAddress extends React.Component {
  static propTypes = {
    cities: PropTypes.arrayOf(PropTypes.object).isRequired,
    assignment: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.onAddressChange = this.onAddressChange.bind(this);
    this.onCityareaChange = this.onCityareaChange.bind(this);
  }
  onAddressChange(address) {
    this.props.dispatch(updateAssignAddress(address));
  }
  onCityareaChange(cityName, areaName) {
    this.props.dispatch(updateAssignCityarea(cityName, areaName));
  }
  valid() {
    this.cityareaInput.valid();
    this.addressInput.valid();
  }
  render() {
    const { assignment, cities } = this.props;
    const citiesProps = {
      ref: input => (this.cityareaInput = input),
      cities,
      onSelect: this.onCityareaChange,
      onFetchZones: assignment.fetchZones,
      cityName: assignment.city,
      areaName: assignment.area,
      validator: assignment.cityareaValidator,
    };
    const addressDetailProps = {
      ref: input => (this.addressInput = input),
      placeholder: '請輸入',
      onChange: this.onAddressChange,
      value: assignment.address,
      validator: assignment.addressValidator,
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


export default CSS(ReturnAddress, styles);
