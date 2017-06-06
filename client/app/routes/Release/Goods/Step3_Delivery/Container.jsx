import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import { DELIVERY } from '../../constants/title';
import styles from './styles.sass';
import FormGroup from '../../components/FormGroup';
import Contact from './Contact';
import { fetchCities } from '../../../../actions/addressActions';
import {
  TitleWrapper,
  IntervalLine,
  AlertPanel,
  NextStep,
  InputSelection,
  DeliveryOptions,
} from '../../components';
import {
  updateSendOptions,
  updateReturnOptions,
  updateShipBeforeStartDays,
} from '../../../../actions/publishActions';
import { PATH } from '../../constants';


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
  };
  static saveAndNext() {
    browserHistory.push(PATH.STEP_4_PRICE);
  }
  constructor(props) {
    super(props);
    this.onShipDaysChange = this.onShipDaysChange.bind(this);
    this.onSendOptionsChange = this.onSendOptionsChange.bind(this);
    this.onReturnOptionsChange = this.onReturnOptionsChange.bind(this);
    this.validateAll = this.validateAll.bind(this);
    this.state = {
      sendOptionsError: null,
      returnOptionsError: null,
    };
  }
  componentDidMount() {
    this.dispatch(fetchCities());
  }
  onShipDaysChange(option) {
    this.dispatch(updateShipBeforeStartDays(option.value));
  }
  onSendOptionsChange(options) {
    this.dispatch(updateSendOptions(options));
  }
  onReturnOptionsChange(options) {
    this.dispatch(updateReturnOptions(options));
  }
  sendOptionsValidator() {
    return this.optionsValidator('sendOptions');
  }
  dispatch(excution) {
    this.props.dispatch(excution);
  }
  validSendOptions() {
    const errors = this.sendOptionsValidator();
    this.setState({ sendOptionsError: _.isEmpty(errors) ? null : errors[0] });
  }
  returnOptionsValidator() {
    return this.optionsValidator('returnOptions');
  }
  validReturnOptions() {
    const errors = this.returnOptionsValidator();
    this.setState({ returnOptionsError: _.isEmpty(errors) ? null : errors[0] });
  }
  validateAll() {
    this.validSendOptions();
    this.validReturnOptions();
    // TODO: options
    const { returnOptions } = this.props.publish;
    if (_.includes(returnOptions, '1')) {
      this.returnOptions.valid();
    }
    this.inputContact.valid();
  }
  isAllValid() {
    const isSendOptionsValid = _.isEmpty(this.sendOptionsValidator());
    const isReturnOptionsValid = _.isEmpty(this.returnOptionsValidator());
    // TODO: options
    const { returnOptions } = this.props.publish;
    if (_.includes(returnOptions, '1')) {
      const { returnAddresses } = this.props.publish;
      if (_.isEmpty(returnAddresses.join(''))) {
        return false;
      }
    }
    return isSendOptionsValid && isReturnOptionsValid;
  }
  optionsValidator(name) {
    const { publish } = this.props;
    return _.isEmpty(publish[name]) ? ['至少需選一項'] : [];
  }
  needContact() {
    const { returnOptions } = this.props.publish;
    const allowReturnSeven = _.includes(returnOptions, '2');
    const allowReturnMail = _.includes(returnOptions, '1');
    return allowReturnSeven || allowReturnMail;
  }
  render() {
    const { publish } = this.props;
    const nextStepProps = {
      onNext: this.constructor.saveAndNext,
      onValid: this.validateAll,
      isDisabled: !this.isAllValid(),
    };
    const shipBeforeStartDaysOptions = [1, 2, 3, 4, 5, 6, 7].map(n =>
      ({ value: n, text: `使用的前${n}天內到貨` }),
    );
    return (
      <div styleName="container">
        <TitleWrapper>{DELIVERY}</TitleWrapper>
        <FormGroup headerText="寄件日期">
          <InputSelection
            options={shipBeforeStartDaysOptions}
            value={1}
            onSelect={this.onShipDaysChange}
          />
        </FormGroup>
        <IntervalLine marginBottom={20} color="#888" />
        <FormGroup headerText="提供的寄件方式" multiple large>
          <DeliveryOptions
            onChange={this.onSendOptionsChange}
            options={publish.sendOptions}
          />
          {this.state.sendOptionsError &&
            <AlertPanel message={this.state.sendOptionsError} />
          }
        </FormGroup>
        <IntervalLine marginBottom={20} color="#888" />
        <FormGroup headerText="接受的寄還方式" multiple large>
          <DeliveryOptions
            ref={deopt => (this.returnOptions = deopt)}
            onChange={this.onReturnOptionsChange}
            options={publish.returnOptions}
            requireAddress
            cities={this.props.cities}
            dispatch={this.props.dispatch}
            returnAddresses={publish.returnAddresses}
          />
          {this.state.returnOptionsError &&
            <AlertPanel message={this.state.returnOptionsError} />
          }
        </FormGroup>
        <IntervalLine marginBottom={20} color="#888" />
        <FormGroup
          headerText="收件人資訊"
          helperText="為保護您的個資，您的聯絡資訊只有在您同意預訂單後才會提供給使用人喔！"
          large
        >
          <Contact
            ref={ic => (this.inputContact = ic)}
            name={publish.contactName}
            phone={publish.contactPhone}
            disabled={!this.needContact()}
            dispatch={this.props.dispatch}
          />
        </FormGroup>
        <IntervalLine marginBottom={20} color="#888" />
        <NextStep {...nextStepProps} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { environment, routesHelper, cities, publish } = state;
  return ({ environment, routesHelper, cities, publish });
};
export default connect(mapStateToProps)(CSS(DeliveryContainer, styles));
