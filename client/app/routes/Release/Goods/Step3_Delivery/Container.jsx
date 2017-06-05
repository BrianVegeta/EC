import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import { DELIVERY } from '../../constants/title';
import styles from './styles.sass';
import FormGroup from '../../components/FormGroup';
import InputChecksGroup from '../../components/InputChecksGroup';
import ReturnAddressContainer from './ReturnAddress/Container';
import { fetchCities } from '../../../../actions/addressActions';
import {
  TitleWrapper,
  IntervalLine,
  AlertPanel,
  NextStep,
} from '../../components';
import {
  OPTION_IN_PERSON,
  OPTION_MAIL,
  OPTION_SEVEN,
  updateSendOptions,
  updateReturnOptions,
} from '../../../../actions/publishActions';
import { unzip } from '../../../../reducers/publishOptions';
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

    this.onSendSeven = this.onSendSeven.bind(this);
    this.onSendMail = this.onSendMail.bind(this);
    this.onSendInperson = this.onSendInperson.bind(this);
    this.onReturnSeven = this.onReturnSeven.bind(this);
    this.onReturnMail = this.onReturnMail.bind(this);
    this.onReturnInperson = this.onReturnInperson.bind(this);

    this.validateAll = this.validateAll.bind(this);
    this.state = {
      sendOptionsError: null,
      returnOptionsError: null,
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchCities());
  }

  onSendSeven(isChecked) {
    this.props.dispatch(
      updateSendOptions(OPTION_SEVEN, isChecked),
    );
  }
  onSendMail(isChecked) {
    this.props.dispatch(
      updateSendOptions(OPTION_MAIL, isChecked),
    );
  }
  onSendInperson(isChecked) {
    this.props.dispatch(
      updateSendOptions(OPTION_IN_PERSON, isChecked),
    );
  }
  onReturnSeven(isChecked) {
    this.props.dispatch(
      updateReturnOptions(OPTION_SEVEN, isChecked),
    );
  }
  onReturnMail(isChecked) {
    this.props.dispatch(
      updateReturnOptions(OPTION_MAIL, isChecked),
    );
  }
  onReturnInperson(isChecked) {
    this.props.dispatch(
      updateReturnOptions(OPTION_IN_PERSON, isChecked),
    );
  }
  optionsValidator(name) {
    const { publish } = this.props;
    return _.isEmpty(publish[name]) ? ['至少需選一項'] : [];
  }
  sendOptionsValidator() {
    return this.optionsValidator('sendOptions');
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
  }
  isAllValid() {
    const isSendOptionsValid = _.isEmpty(this.sendOptionsValidator());
    const isReturnOptionsValid = _.isEmpty(this.returnOptionsValidator());
    return isSendOptionsValid && isReturnOptionsValid;
  }
  render() {
    const { publish } = this.props;
    const sendOptKeys = unzip(publish.sendOptions);
    const sendOptions = [
      { text: '7-11交貨便',
        onChange: this.onSendSeven,
        isChecked: !_.isUndefined(sendOptKeys[OPTION_SEVEN]) },
      { text: '自行寄件',
        onChange: this.onSendMail,
        isChecked: !_.isUndefined(sendOptKeys[OPTION_MAIL]) },
      { text: '面交（自行協調取貨地點）',
        onChange: this.onSendInperson,
        isChecked: !_.isUndefined(sendOptKeys[OPTION_IN_PERSON]) },
    ];
    const returnOptKeys = unzip(publish.returnOptions);
    const returnOptions = [
      { text: '7-11交貨便',
        onChange: this.onReturnSeven,
        isChecked: !_.isUndefined(returnOptKeys[OPTION_SEVEN]) },
      { text: '自行寄件',
        onChange: this.onReturnMail,
        collectedNode: <ReturnAddressContainer ref={ra => (this.returnAddress = ra)} />,
        isChecked: !_.isUndefined(returnOptKeys[OPTION_MAIL]) },
      { text: '面交（自行協調取貨地點）',
        onChange: this.onReturnInperson,
        isChecked: !_.isUndefined(returnOptKeys[OPTION_IN_PERSON]) },
    ];
    const nextStepProps = {
      onNext: this.constructor.saveAndNext,
      onValid: this.validateAll,
      isDisabled: !this.isAllValid(),
    };
    return (
      <div styleName="container">
        <TitleWrapper>{DELIVERY}</TitleWrapper>
        <FormGroup headerText="可提供的寄件方式" multiple>
          <InputChecksGroup options={sendOptions} />
          {this.state.sendOptionsError && <AlertPanel message={this.state.sendOptionsError} />}
        </FormGroup>
        <FormGroup headerText="可接受的寄還方式" multiple>
          <InputChecksGroup options={returnOptions} />
          {this.state.returnOptionsError && <AlertPanel message={this.state.returnOptionsError} />}
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
