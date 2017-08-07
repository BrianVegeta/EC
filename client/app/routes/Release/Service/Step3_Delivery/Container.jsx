import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styles from './styles.sass';
import FormGroup from '../../components/FormGroup';
import { fetchCities } from '../../../../actions/addressActions';
import {
  TitleWrapper,
  IntervalLine,
  AlertPanel,
  NextStep,
  InputSelection,
} from '../../components';
import {
  updateAppointmentRrior,
  updateAssignmentOptions,
} from '../../../../actions/publishActions';
import { PATH, TITLE } from '../constants';
import ServiceOptions from './ServiceOptions';
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
    this.onPriorChange = this.onPriorChange.bind(this);
    this.valid = this.valid.bind(this);
    this.onAssignmentChange = this.onAssignmentChange.bind(this);
    this.state = {
      optionsError: null,
    };
  }
  componentDidMount() {
    this.props.dispatch(fetchCities());
  }
  onPriorChange(option) {
    this.props.dispatch(updateAppointmentRrior(option.value));
  }
  onAssignmentChange(options) {
    this.props.dispatch(updateAssignmentOptions(options));
  }
  valid() {
    const model = new Model(this.props.publish);
    model.assignment.validOptions(error => this.setState({ optionsError: error }));
    this.serviceOptions.valid();
  }
  isValid() {
    const { assignment } = new Model(this.props.publish);
    const isAssignmentValid = assignment.isOptionsValid();
    if (assignment.isRequiredAddress) {
      return isAssignmentValid && assignment.isAddressesValid();
    }
    return isAssignmentValid;
  }
  render() {
    const { publish, dispatch } = this.props;
    const model = new Model(publish, dispatch);
    const { optionsError } = this.state;
    return (
      <div styleName="container">
        <TitleWrapper>{TITLE.DELIVERY}</TitleWrapper>
        <FormGroup headerText="提前預約天數">
          <InputSelection
            options={model.appointmentPrior.options}
            onSelect={this.onPriorChange}
            value={model.appointmentPrior.value}
          />
        </FormGroup>
        <IntervalLine marginBottom={20} />
        <FormGroup headerText="可提供的服務方式" multiple large>
          <ServiceOptions
            ref={options => (this.serviceOptions = options)}
            onChange={this.onAssignmentChange}
            assignment={model.assignment}
            cities={this.props.cities}
            dispatch={this.props.dispatch}
          />
          {optionsError && <AlertPanel message={optionsError} /> }
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
