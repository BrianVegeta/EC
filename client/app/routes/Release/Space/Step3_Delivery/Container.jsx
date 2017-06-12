import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styles from './styles.sass';
import FormGroup from '../../components/FormGroup';
import { fetchCities } from '../../../../actions/addressActions';
import { updateProgress } from '../../../../actions/publishActions';
import {
  TitleWrapper,
  IntervalLine,
  InputSelectionCitiesWithError,
  InputTextWithError,
  NextStep,
  InputSelection,
} from '../../components';
import { PATH, TITLE } from '../constants';
import Model from '../Model';


class DeliveryContainer extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    publish: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string,
        PropTypes.number,
      ]),
    ).isRequired,
    cities: PropTypes.array.isRequired,
  };
  static saveAndNext() {
    browserHistory.push(PATH.STEP_4_PRICE);
  }
  constructor(props) {
    super(props);
    this.valid = this.valid.bind(this);
    this.state = {
      optionsError: null,
    };
  }
  componentDidMount() {
    this.props.dispatch(updateProgress('STEP_3_DELIVERY'));
    this.props.dispatch(fetchCities());
  }
  valid() {
    this.cityareaInput.valid();
    this.addressInput.valid();
  }
  isValid() {
    const { publish, dispatch } = this.props;
    const { appointmentPrior, assignment } = new Model(publish, dispatch);
    return appointmentPrior.isValid()
      && assignment.isAddressesValid();
  }
  render() {
    const { publish, dispatch } = this.props;
    const { appointmentPrior, assignment } = new Model(publish, dispatch);
    return (
      <div styleName="container">
        <TitleWrapper>{TITLE.DELIVERY}</TitleWrapper>
        <FormGroup headerText="提前預約天數">
          <InputSelection
            options={appointmentPrior.options}
            onSelect={appointmentPrior.update}
            value={appointmentPrior.value}
          />
        </FormGroup>
        <IntervalLine marginBottom={20} />
        <FormGroup headerText="空間地址">
          <InputSelectionCitiesWithError
            {...{
              ref: input => (this.cityareaInput = input),
              cities: this.props.cities,
              placeholder: '城市/地區',
              onSelect: assignment.updateCityarea,
              onFetchZones: assignment.fetchZones,
              cityName: assignment.city,
              areaName: assignment.area,
              validator: assignment.cityareaValidator,
            }}
          />
          <div style={{ marginBottom: 20 }} />
          <InputTextWithError
            {...{
              ref: input => (this.addressInput = input),
              placeholder: '請輸入',
              onChange: assignment.updateAddress,
              value: assignment.address,
              validator: assignment.addressValidator,
            }}
          />
        </FormGroup>
        <NextStep
          {...{
            onNext: this.constructor.saveAndNext,
            onValid: this.valid,
            isDisabled: !this.isValid(),
          }}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { environment, routesHelper, cities, publish } = state;
  return ({ environment, routesHelper, cities, publish });
};
export default connect(mapStateToProps)(CSS(DeliveryContainer, styles));
